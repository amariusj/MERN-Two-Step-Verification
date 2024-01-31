
// REQUIRE MONGOOSE

const mongoose = require('mongoose')

// CREATE THE USER SCHEMA

const userSchema = new mongoose.Schema({

    firstName: { type: String, trim: true, required: true  },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    phoneNumber: { type: String, trim: true, unique: true, required: true },
    password: { type: String, trim: true, required: true }

}, {
    timestamps: true
})

// EXPORT THE USER MODEL

module.exports = mongoose.model('User', userSchema)