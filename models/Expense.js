const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true  // ✅ Make it required
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    default: 'general'
  },
  description: String
}, { timestamps: true })

module.exports = mongoose.model('Expense', expenseSchema)
