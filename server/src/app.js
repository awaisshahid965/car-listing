const express = require('express')
const cors = require('cors')
const efu = require('express-fileupload')

const loginRouter = require('./api/login/login.routes')
const vehicleRouter = require('./api/vehicle/vehicle.routes')
const { authenticateRequestMiddleware } = require('./middlewares/auth')

const app = express()

// middlewares...
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(efu())

// apis...
app.use('/api/auth', loginRouter)
app.use('/api/vehicle', authenticateRequestMiddleware, vehicleRouter)
app.get('/', (req, res) => {
  res.json({ appWorking: 'ok' })
})

module.exports = {
  app,
}
