const { JWTTokenValidation, sendServerResponse } = require('../utils')

const authenticateRequestMiddleware = (req, res, next) => {
  const token = req.headers.authorization || ''
  const { isTokenValid, decodedData } = JWTTokenValidation(token.slice(7))
  if (!isTokenValid) {
    return sendServerResponse(res, null, { error: 'Authentication failed: Invalid token' }, 401)
  }
  req.userId = decodedData.userId
  next()
}

module.exports = {
  authenticateRequestMiddleware,
}
