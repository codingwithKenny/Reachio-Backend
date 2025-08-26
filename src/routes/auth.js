const express = require('express')
const { handleSignUp, handleLogin } = require('../controller/auth')
const route = express.Router()


route.post('/signup',handleSignUp)
route.post('/login',handleLogin  )

module.exports = route; 
