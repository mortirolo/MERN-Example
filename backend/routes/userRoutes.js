const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

// Create new user
router.post('/', registerUser)

// Login
router.post('/login', loginUser)

// Get user info
//router.get('/me', getMe)  // for initial devel
router.get('/me', protect, getMe)  // Protect against unauthorized access with protect auth token

module.exports = router