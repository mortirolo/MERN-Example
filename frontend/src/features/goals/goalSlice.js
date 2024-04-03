import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'  // goalService is an obj, not func, so no {}

// Define initial state
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      // Create goal route is protected so we need to send our token
      // token is found in storage in our user state
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(goalData, token)
    } catch (error) {
      // Get error message from server; can come from a variety of places
      const message = (error.response && error.response.data &&
                       error.response.data.message) ||
                       error.message ||
                       error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get User Goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => { 
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error) {
      const message = (error.response && error.response.data &&
                       error.response.data.message) ||
                       error.message ||
                       error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

  export const deleteGoal = createAsyncThunk(
    'goals/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
      } catch (error) {
        const message = (error.response && error.response.data &&
                       error.response.data.message) ||
                       error.message ||
                       error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    // Unlike the user state, goal state does not need to persist
    // therefore, reset it to its initial state
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {  // When txn pending set .isLoading to true
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)  //.push is redux helper; new goal data sent back from API
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload  //.push is redux helper; new goal data sent back from API
      })
      //---------------------------------
      .addCase(getGoals.pending, (state) => {  // When txn pending set .isLoading to true
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload  //.push is redux helper; new goal data sent back from API
      })
      //---------------------------------
      .addCase(deleteGoal.pending, (state) => {  // When txn pending set .isLoading to true
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Filter out deleted goal from the UI's state, otherwise user will have to reload page
        // to see that the goal is gone
        state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload  //.push is redux helper; new goal data sent back from API
      })
  },
})

// reset has to be exported from slice actions
export const { reset } = goalSlice.actions
export default goalSlice.reducer  // Add reducer to store