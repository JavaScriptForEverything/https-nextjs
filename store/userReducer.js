import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'
import { catchAsyncDispatch } from '../uitl'
import absoluteUrl from 'next-absolute-url'

import { productReducer } from './productReducer'
// console.log( productReducer )

const { reducer, actions } = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: '',
    status: '', 						// to check server-side response success or not
    authenticated: false,

    user: {},

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
      error: '',
    }),
    authenticateUser: (state, action) => ({
    	...state,
    	status: '',
    	authenticated: true,
    }),
    resetSuccess: (state, action) => ({
      ...state,
      loading: false,
      status: ''
    }),

    signUpUser: (state, action) => ({
      ...state,
      loading: false,
      ...action.payload
    }),
    loginUser: (state, action) => ({
      ...state,
      loading: false,

      ...action.payload 				// { status: 'success', user: {...}}
    }),
    addUserToStore: (state, action) => ({
      ...state,
      loading: false,
      authenticated: true,
      user: action.payload
    }),
    logoutUser: (state, action) => ({
      ...state,
      loading: false,
      authenticated: false,
      user: {}
    }),

  }, // end of reducers
	extraReducers: {
		[HYDRATE]: (state, action) => {

			return {
				...state,
				// ...action.payload
				user: { ...state.user, ...action.payload }
			}
		}
	}
})
export default reducer


// /pages/signup.js  =>  changeHandler
export const showError = (message='') => (dispatch) => {
  // console.log('showError called')
  message 
    ? dispatch(actions.failed(message))
    : dispatch(actions.resetErrorMessage())
}

// /pages/signup.js  	=> useEffect()
export const resetSuccess = () => (dispatch) => {
	dispatch(actions.resetSuccess())
}

// /pages/login.js  	=> useEffect()
export const authenticateUser = () => (dispatch) => {
	dispatch(actions.authenticateUser())
}

// /pages/signup.js => submitHandler
export const signUpUser = (fields) => catchAsyncDispatch( async (dispatch) => {
  dispatch(actions.requested())
  const { data } = await axios.post('/api/users/signup', fields)
  dispatch(actions.signUpUser(data))
}, actions.failed)


// /pages/login.js => submitHandler
export const loginUser = (fields) => catchAsyncDispatch( async (dispatch) => {
  dispatch(actions.requested())
  const { data } = await axios.post('/api/users/login', fields)
  dispatch(actions.loginUser(data))

  localStorage.setItem('user', JSON.stringify(data.user))

}, actions.failed)


// /pages/profile.js => useEffect()
export const addUserToStore = () => (dispatch) => {
	let user = localStorage.getItem('user')
			user = JSON.parse(user)

	dispatch(actions.addUserToStore(user))
}


// /pages/index.js 	onClick={clickHandler}
export const logoutUser = () => catchAsyncDispatch(async(dispatch) => {
	await axios.post(`/api/users/logout`, {})

	dispatch(actions.requested())
	dispatch(actions.logoutUser())

  localStorage.removeItem('user')

}, actions.failed)





export const test = (data) => (dispatch) => {
	// console.log({ data })
	dispatch(actions.requested())
	dispatch(actions.test(data))
}


