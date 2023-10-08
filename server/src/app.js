const express = require('express')
const cors = require('cors')
const loginRouter = require('./api/login/login.routes')
const { authenticateRequestMiddleware } = require('./middlewares/auth')

const app = express()

// middlewares...
app.use(express.json())
app.use(cors())

// apis...
app.use('/api/auth', loginRouter)
app.get('/', authenticateRequestMiddleware, (req, res) => {
  res.json({ success: 'ok' })
})

module.exports = {
  app,
}
