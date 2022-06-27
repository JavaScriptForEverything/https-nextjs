import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { catchAsyncDispatch } from '../uitl'

const { reducer, actions } = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: '',
    user: {}
  },
  reducers: {
    requested: (state, action) => ({
      ...state,
      loading: true,
      error: '',
    }),
    failed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload
    }),
    resetErrorMessage: (state, action) => ({    // just for redux store readability
      ...state,
      loading: false,
      error: ''
    }),
    signUpUser: (state, action) => ({
      ...state,
      loading: false,
      user: action.payload
    }),
    loginUser: (state, action) => ({
      ...state,
      loading: false,
      user: action.payload
    }),
  } // end of reducers
})
export default reducer


// /pages/signup.js  =>  changeHandler
export const showError = (message='') => (dispatch) => {
  // console.log('showError called')
  message 
    ? dispatch(actions.failed(message))
    : dispatch(actions.resetErrorMessage())
}


// /pages/signup.js => submitHandler
export const signUpUser = (data) => catchAsyncDispatch( async (dispatch) => {
  dispatch(actions.requested())
  const { data: { user } } = await axios.post('/api/users/signup', data)
  dispatch(actions.signUpUser(user))
}, actions.failed)


// /pages/login.js => submitHandler
export const loginUser = (data) => catchAsyncDispatch( async (dispatch) => {
  dispatch(actions.requested())
  const { data: { user } } = await axios.post('/api/users/login', data)
  dispatch(actions.loginUser(user))
}, actions.failed)