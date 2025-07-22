const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    
    console.log('=== AUTH MIDDLEWARE DEBUG ===');
    console.log('Headers:', req.headers.authorization);
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token extracted:', token);
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token decoded:', decoded);
            
            req.user = await User.findById(decoded.id).select('-password');
            console.log('User found:', req.user);
            
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }
            
            next();
        } catch (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.log('No token found');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
