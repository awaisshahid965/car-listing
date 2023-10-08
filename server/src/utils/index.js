const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

module.exports.encryptTextData = async (textData, saltRounds = 10) => {
  if (!textData) {
    return ''
  }
  const hash = await bcrypt.hash(textData, saltRounds)
  return hash
}

module.exports.isEncryptedDataValid = async (data, encryptedData) => {
  const isDataMatched = await bcrypt.compare(data, encryptedData)
  return isDataMatched
}

module.exports.getJWTSignedToken = (data, expiresIn = '1h') => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn,
  })
}

const generateLoginErrorMessages = (errors) => {
  const errorsObject = {}
  errors.forEach((error) => {
    errorsObject[error.path] = error.msg
  })
  return errorsObject
}

module.exports.generateErrorObjectExpressValidator = (requestInstance) => {
  const expressValidatorErrorsArray = validationResult(requestInstance)
  const hasErrors = !expressValidatorErrorsArray.isEmpty()
  const errors = generateLoginErrorMessages(expressValidatorErrorsArray.array())

  return {
    hasErrors,
    errors,
  }
}

module.exports.sendServerResponse = (responseInstance, data, errors = {}, status) => {
  if (Object.values(errors).length) {
    const errorResponseData = {
      data: null,
      errors,
    }
    return responseInstance.status(status ?? 500).json(errorResponseData)
  }
  const successResponseData = {
    data,
    errors: null,
  }
  return responseInstance.status(status ?? 200).json(successResponseData)
}

module.exports.JWTTokenValidation = (token) => {
  if (!token) {
    return false
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET)
    const isUserIdValid = !!decodedData.userId
    const currentTime = Math.floor(Date.now() / 1000)
    const isTokenExpired = decodedData.exp <= currentTime

    if (!isUserIdValid || isTokenExpired) {
      throw new Error()
    }

    return {
      isTokenValid: true,
      decodedData,
    }
  } catch (_) {
    return {
      isTokenValid: false,
      decodedData: {},
    }
  }
}
