// File Contains reducers, initial state, etc.
// Redux handles the state
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// When user logs in we get back an auth token which is needed to access protected routes
// Token gets saved in localStorage
// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,  // user if retrieved from localStorage, else null
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user; we need to account for pending, fulfilled, and rejected states (done in extraReducers)
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      // Get error message from server; can come from a variety of places
      const message = (error.response && error.response.data &&
                       error.response.data.message) ||
                       error.message ||
                       error.toString()
      
      return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      // Get error message from server; can come from a variety of places
      const message = (error.response && error.response.data &&
                       error.response.data.message) ||
                       error.message ||
                       error.toString()
      
      return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk (
  'auth/logout', 
  async () => {
    await authService.logout()
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {  // Not asynchronous or Thunk funcs
    // Reset state back to initial values when loading page, except for user
    // user must persist 
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  // Handle pending, fulfilled, rejected states
  extraReducers: (builder) => {  // Asynchronous and Thunk funcs
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // action contains user id, token, etc;
        // Comes from register func above: return await authService.register(user) 
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload  // This payload comes from register's catch message
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // action contains user id, token, etc;
        // Comes from login func above: return await authService.login(user) 
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload  // This payload comes from register's catch message
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

// Following export allows us to import reset into other components where it is to be called
// reset has to be exported from slice actions
export const { reset } = authSlice.actions
export default authSlice.reducer  // Add reducer to app/store
