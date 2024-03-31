// NOTE: We are using common JS syntax here, not ES2015 like we do
// in the frontend with React
const express = require('express')
const router = express.Router()  // Declare our router
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')  // Bring in the controller object

// router.get('/', (req, res) => {
//   res.status(200).json({message: 'Get goals'}) // specify that 
// })
// Modify above to call the resource's controller function
//router.get('/', getGoals)  // Router is getting our resource's get function
//router.post('/', setGoal)  // Router is posting to our resource's set function
// Above can be combined into one line of code bc they share the path '/'
router.route('/').get(getGoals).post(setGoal)

// We can do the same with the below, if we wish
// Expecting path /api/goals/13487, for example
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)









router.put('/:id', (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}`}) // specify that 
})

router.delete('/:id', (req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}`}) // specify that 
})

module.exports = router