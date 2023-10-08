const vehicleRouter = require('express').Router()
const { vehicleRequestValidators } = require('./vehicle.model')
const { addVehicle, getAllVehicles } = require('./vehicle.controller')

vehicleRouter.post('/add', vehicleRequestValidators, addVehicle)

vehicleRouter.get('/get-all', getAllVehicles)

module.exports = vehicleRouter
