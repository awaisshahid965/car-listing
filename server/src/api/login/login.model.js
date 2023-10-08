const mongoose = require('mongoose')
const { encryptTextData } = require('../../utils')
const { check } = require('express-validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }

  user.password = encryptTextData(user.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

// validators for model
module.exports.loginRequestValidators = [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
]
