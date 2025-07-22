// models/User.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false // optional here since your register doesn't send name yet
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)
module.exports = User
