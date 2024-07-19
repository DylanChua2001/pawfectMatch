const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    const JWT_SECRET = process.env.JWT;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        
        // Check if isAdmin is true
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Forbidden: User is not an admin' });
        }
        req.user = decoded; // Attach decoded user information to request object
        next();
    });
};

const verifyToken2 = (req, res, next) => {
    const token = req.cookies.token;
    const JWT_SECRET = process.env.JWT;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        
        // Check if isAdmin is true
        if (!decoded.user_id) {
            return res.status(403).json({ message: 'Forbidden: User is not verified' });
        }
        req.user = decoded; // Attach decoded user information to request object
        next();
    });
};

module.exports = {
    verifyToken,
    verifyToken2
};
