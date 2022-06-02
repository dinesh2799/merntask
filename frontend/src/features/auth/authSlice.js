import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user= JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: user?user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try{
        return await authService.register(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||error.message ||error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

  // export const editUser = createAsyncThunk('auth/editUser', async (_, thunkAPI) => {
  //   try {
  //     const token = thunkAPI.getState().auth.user.token
  //     return await authService.editUser(token)
  //   } catch (error) {
  //     const message = (error.response && error.response.data && error.response.data.message) ||error.message ||error.toString()
  //     return thunkAPI.rejectWithValue(message)
  //   }
  // })

  export const editUser = createAsyncThunk('auth/editUser',async(postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await authService.editUser(postData,token)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUser = createAsyncThunk('auth/getUser', async(thunkAPI) => {
    try{
      const token = thunkAPI.getState().auth.user.token
      return await authService.getUser(token)
    }
    catch(error){
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const profilePicture = createAsyncThunk('auth/profilePicture',async(postData, thunkAPI) => {
  try{
      const token = thunkAPI.getState().auth.user.token
      return await authService.profilePicture(postData,token)
  }
  catch(error){
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async()=> {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(editUser.pending, (state)=> {
        state.isLoading=true
    })
    .addCase(editUser.fulfilled, (state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.user.name = action.payload.name
        state.user.email = action.payload.email
        state.user.phone = action.payload.phone
        state.user.gender = action.payload.gender
        state.user.address= action.payload.address
        state.user.dob= action.payload.dob
        localStorage.setItem('user', JSON.stringify(action.payload))
        // localStorage.setItem('state', serializedState);
    })
    .addCase(editUser.rejected, (state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message = action.payload
        // state.user = action.payload
    })
    .addCase(profilePicture.pending, (state)=> {
      state.isLoading=true
  })
  .addCase(profilePicture.fulfilled, (state,action)=>{
      state.isLoading=false
      state.isSuccess=true
      // state.user.name = action.payload.name
      // state.user.email = action.payload.email
      // state.user.phone = action.payload.phone
      // state.user.gender = action.payload.gender
      // state.user.address= action.payload.address
      // state.user.dob= action.payload.dob
  })
  .addCase(profilePicture.rejected, (state,action)=>{
      state.isLoading=false
      state.isError=true
      state.message = action.payload
      // state.user = action.payload
  })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer