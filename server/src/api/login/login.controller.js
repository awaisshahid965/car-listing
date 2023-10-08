const User = require('./login.model')
const {
  isEncryptedDataValid,
  generateErrorObjectExpressValidator,
  sendServerResponse,
  getJWTSignedToken,
  isJWTTokenValid,
} = require('../../utils')

module.exports.loginPostController = async (req, res) => {
  const { email = '', password = '' } = req.body
  const { errors, hasErrors } = generateErrorObjectExpressValidator(req)

  if (hasErrors) {
    return sendServerResponse(res, null, errors)
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() })
    const isPasswordValid = !!user && (await isEncryptedDataValid(password, user.password))
    if (!user || !isPasswordValid) {
      return sendServerResponse(res, null, { form: 'Invalid credentials' }, 401)
    }

    const token = getJWTSignedToken({ userId: user._id.toString() })
    return sendServerResponse(res, { token })
  } catch (error) {
    console.error(error)
    return sendServerResponse(res, null, { message: 'Internal Server error' }, 500)
  }
}

module.exports.userAuthenticationStatus = async (req, res) => {
  const token = req.headers.authorization || ''
  const isTokenValid = isJWTTokenValid(token.slice(7))
  return sendServerResponse(res, { isValidUser: isTokenValid })
}
