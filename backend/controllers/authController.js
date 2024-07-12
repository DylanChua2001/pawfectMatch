const User = require("../models/userModel");

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
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        req.session.user = { id: user.id, username: user.username, role: user.role };
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
