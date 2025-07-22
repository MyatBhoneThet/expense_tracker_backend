const express = require('express');
const router = express.Router();
const { getAllIncome, addIncome } = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');  // Fixed import

// Apply protect middleware to all income routes
router.get('/', protect, getAllIncome);
router.post('/', protect, addIncome);

module.exports = router;
