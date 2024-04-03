const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')  // Used to hash passwords
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// *********************************************
// Register New User
// *********************************************
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Verify form input
  if ( !name || !email || !password ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user already exists
  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password; we need to first generate a salt before hashing the password
  const salt = await bcrypt.genSalt(10)  // Generate salt
  const hashedPassword = await bcrypt.hash(password, salt)  // Hash password

  // Create user entry in the DB
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  // Check if user created successfully
  if (user) {
    res.status(201).json({  // 201 = OK, something was created
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

  //res.json({message: 'Register User'})  // only for initial devel
})


// *********************************************
// Login
// *********************************************
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Lookup user by email
  const user = await User.findOne({email})

  // if email exists check text password against stored hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }

  //res.json({message: 'Login User'})  // only for initial devel
})


// *********************************************
// Display User Data
// *********************************************
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


// *********************************************
// Generate JWT
// *********************************************
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {  // use our JWT_SECRET env var
    expiresIn: '30d'  // Token expires in 30 days
  })
}



module.exports = {
  registerUser,
  loginUser,
  getMe,
}