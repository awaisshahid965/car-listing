const mongoose = require('mongoose')
const { check } = require('express-validator')

const vehicleSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: true,
    minLength: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{11}$/.test(value)
      },
      message: 'Phone number must have exactly 11 digits',
    },
  },
  maxPictures: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  images: [{ type: String }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle

module.exports.vehicleRequestValidators = [
  check('carModel', 'Car Model must have a minimum length of 3 characters').isLength({ min: 3 }),
  check('price', 'Price is required and must be a number').isNumeric(),
  check('phoneNumber', 'Phone Number must have exactly 11 digits').isLength({ min: 11, max: 11 }),
  check('maxPictures', 'Max Pictures must be a number between 1 and 10').isInt({ min: 1, max: 10 }),
]
