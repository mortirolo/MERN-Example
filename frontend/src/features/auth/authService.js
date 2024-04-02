import axios from 'axios'  // similar to POSTMAN but used from within our app

// ./frontend/package.json contains proxy var which inserts https://localhost:5000
// in front of following URL
const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  // Make post req to register user, and get response
  const response = await axios.post(API_URL, userData)

  if (response.data) {  // Check that axios returned data in response
    // Put user data, including token, in localStorage
    // Stringify bc we can only store strings in localStorage
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  // Make post req to login user, and get response
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {  // Check that axios returned data in response
    // Put user data, including token, in localStorage
    // Stringify bc we can only store strings in localStorage
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService