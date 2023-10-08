const { sendServerResponse, generateErrorObjectExpressValidator } = require('../../utils')
const Vehicle = require('./vehicle.model')

module.exports.addVehicle = async (req, res) => {
  try {
    const { carModel, price, phoneNumber, maxPictures, images } = req.body

    const userId = req.userId

    const { errors, hasErrors } = generateErrorObjectExpressValidator(req)

    if (hasErrors) {
      return sendServerResponse(res, null, errors)
    }
    const vehicle = new Vehicle({
      carModel,
      price,
      phoneNumber,
      maxPictures,
      images,
      userId,
    })

    await vehicle.save()

    return sendServerResponse(res, { dataAdded: true })
  } catch (error) {
    console.error(error)
    sendServerResponse(res, null, { data: 'Internal Server Error!' }, 500)
  }
}

module.exports.getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({}).lean()
  sendServerResponse(res, vehicles)
}
