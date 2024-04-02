const asyncHandler = require('express-async-handler');  // Use express error handler to handle async-await statements instead of try-catch
const Goal = require('../models/goalModel.js');
const User = require('../models/userModel.js');

// Prior to connecting to MongDB
// const getGoals = (req, res) => {
//   // console.log('Received GET req')  // Test msg
//   res.status(200).json({message:'Get goals'})
// }

// Mongoose DB returns a promise which we handle with an async, await statement
// Use express-async-handler
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  //const goals = await Goal.find()
  const goals = await Goal.find({ user: req.user.id })

  // res.status(200).json({message:'Get goals'})  // wo/ DB
  res.status(200).json(goals)
})


// @desc    Set goal
// @route   POST /api/goal
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  // console.log(req.body)  // Test msg
  // console.log(req.body.text)  // Test msg
  // console.log('Checking for post error')
  if (!req.body.text) {
    console.log('controller post error triggered: body text:', req.body.text)
    // If body has no text respond w/ status 400 and msg
    // res.status(400).json({message: 'Please add a text field'})
    res.status(400)
    // Use express error handler in ./middleware/errorMiddleware.js
    // console.log('Throwing post error, controller')
    throw new Error('Please add a text field')  
  }
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id
    })

    //res.status(200).json({message: 'Set goal'}) // specify that 
    res.status(200).json(goal) // specify that 
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  // Fetch goal by id
  const goal = await Goal.findById(req.params.id)
  // Make sure we get our goal db entry back
  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Make sure logged-in user owns goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Update the goal entry
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,  // This option creates DB entry if it doesn't already exist
  })

  res.status(200).json(updatedGoal) // specify that 
})

// @desc    Delete goal
// @route   DELETE /api/goal/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  // Fetch goal by id
  const goal = await Goal.findById(req.params.id)
  // Make sure we get our goal db entry back
  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Make sure logged-in user owns goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.deleteOne()

  res.status(200).json({ id: req.params.id })  // Return response and id for frontend use
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}

