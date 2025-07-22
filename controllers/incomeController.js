const Income = require('../models/Income');

// GET /api/income
exports.getAllIncome = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(incomes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// POST /api/income
exports.addIncome = async (req, res) => {
    const { title, amount, date, selectOption, reference } = req.body;
    try {
        const newIncome = new Income({
            user: req.user.id,
            title,
            amount,
            date,
            selectOption,
            reference
        });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};
