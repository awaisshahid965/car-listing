require('dotenv').config()
const http = require('http')
const { app } = require('./src/app')
const { initializeMongoDB } = require('./src/config/mongodb')

const FALLBACK_PORT = 4000
const PORT = process.env.PORT || FALLBACK_PORT

const server = http.createServer(app)

const initNodejsApplication = async () => {
  try {
      await initializeMongoDB()
    server.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

initNodejsApplication()
