const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL

async function initializeMongoDB() {
  try {
      await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
            useUnifiedTopology: true,
      })
      console.log('MongoDB connection ready!')
    } catch (error) {
    throw new Error(error.message)
  }
}

async function disconnectMongoDBConnection() {
  await mongoose.disconnect()
}

module.exports = {
  initializeMongoDB,
  disconnectMongoDBConnection,
}
