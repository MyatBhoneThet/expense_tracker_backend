const Expense = require('../models/Expense')

exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.user.id })
    res.json(expense)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).limit(10).sort('-createdAt')
    res.json(expenses)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
