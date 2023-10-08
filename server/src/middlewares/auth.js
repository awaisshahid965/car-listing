const { isJWTTokenValid, sendServerResponse } = require('../utils')

const authenticateRequestMiddleware = (req, res, next) => {
  const token = req.headers.authorization || ''
  const isTokenValid = isJWTTokenValid(token.slice(7))
  if (!isTokenValid) {
    return sendServerResponse(res, null, { error: 'Authentication failed: Invalid token' }, 401)
  }
  next()
}

module.exports = {
  authenticateRequestMiddleware,
}
