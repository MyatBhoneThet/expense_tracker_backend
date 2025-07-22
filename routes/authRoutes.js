const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes - Fixed the profile route
router.get('/profile', protect, (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;
