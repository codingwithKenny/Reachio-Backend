const express = require('express')
const { handleSignUp, handleLogin, handleCheckAuth } = require('../controller/auth')
const { verifyToken } = require('../middleware/verifyToken')
const route = express.Router()


route.post('/signup',handleSignUp)
route.post('/login',handleLogin  )
route.get("/check-auth", verifyToken, handleCheckAuth); // ✅ Protected route


module.exports = route; 
