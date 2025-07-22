const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        required: true
    },
    selectOption: {
        type: String,
        default: 'other'
    },
    reference: String
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);
