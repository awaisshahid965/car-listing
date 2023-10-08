const loginRouter = require('express').Router()
const { loginRequestValidators } = require('./login.model')
const { loginPostController, userAuthenticationStatus } = require('./login.controller')

loginRouter.post('/login', loginRequestValidators, loginPostController)

loginRouter.get('/validation-status', userAuthenticationStatus)

module.exports = loginRouter
