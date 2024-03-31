const asyncHandler = require('express-async-handler');  // Use express error handler to handle async-await statements instead of try-catch

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
  res.status(200).json({message:'Get goals'})
})


// @desc    Set goal
// @route   POST /api/goal
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  // console.log(req.body)  // Test msg
  if (!req.body.text) {
    // If body has no text respond w/ status 400 and msg
    // res.status(400).json({message: 'Please add a text field'})
    res.status(400)
    // Use express error handler in ./middleware/errorMiddleware.js
    throw new Error('Please add a text field')  
  } else {
  res.status(200).json({message: 'Set goal'}) // specify that 
  }
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}`}) // specify that 
})

// @desc    Delete goal
// @route   DELETE /api/goal/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}`}) // specify that 
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}

