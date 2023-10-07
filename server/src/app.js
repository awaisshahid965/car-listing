const express = require('express')
const cors = require('cors')

const app = express()

// middlewares...
app.use(express.json())
app.use(cors())

// apis...

module.exports = {
  app,
}
