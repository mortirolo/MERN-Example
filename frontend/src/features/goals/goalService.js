import axios from 'axios'

const API_URL = '/api/goals/'

// Create new goal
const createGoal = async (goalData, token) => {
  // Authorization header for access to protected route
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, goalData, config)

  return response.data
}

const getGoals = async (token) => {

}

const deleteGoal = async (goalId, token) => {

}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
}

export default goalService