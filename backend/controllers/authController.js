const db = require('../config/db');
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = await User.create({ username, password, role });
        res.status(201).send('User registered');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const queryText = 'SELECT user_password FROM user_table WHERE email_add=$1';
        const { rows } = await db.query(queryText, [username]);
        if (rows.length === 0) {
            return res.status(400).send('User not found');
        }
        const storedPassword = rows[0].user_password;
        const correctPassword = await bcrypt.compare(password, storedPassword);
        if (!correctPassword) {
            return res.status(400).send('Invalid credentials');
        }
        req.session.user = { username };
        res.status(200).json({ message: 'Logged in', session: req.session.user });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in');
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Error logging out');
        }
        res.status(200).send('Logged out');
    });
};

module.exports = {
    login,
    register,
    logout
};
