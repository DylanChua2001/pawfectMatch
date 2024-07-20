const db = require('../config/db');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.jwt;

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
        const queryText = 'SELECT user_id, user_password, is_admin FROM user_table WHERE email_add = $1';
        const { rows } = await db.query(queryText, [username]);

        if (rows.length === 0) {
            return res.status(400).send('User not found');
        }

        const { user_id, user_password, is_admin } = rows[0];
        const correctPassword = await bcrypt.compare(password, user_password);

        if (!correctPassword) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign(
            { userID: user_id, isAdmin: is_admin },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'lax',
            maxAge: 3600000, // 1 hour expiration
        });

        // Respond with user session data
        res.status(200).json({ message: 'Logged in', session: { userID: user_id, isAdmin: is_admin } });

    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in');
    }
};

const logout = (req, res) => {
    console.log('finally')
    res.clearCookie('token', {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0, // Set maxAge to 0 to immediately expire the cookie
    });

    res.status(200).json({ message: 'Logged out' });
};

module.exports = {
    login,
    register,
    logout
};
