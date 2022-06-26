import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    loginUser: (state, action) => ({
      ...state,
      loading: false,
      user: action.payload
    })
  } // end of reducers
})
export default reducer


export const showError = (message='') => (dispatch) => {
  dispatch(actions.failed(message))
}

export const loginUser = (data) => async (dispatch) => {
  try {
    
  dispatch(actions.requested)
  const { data: { user } } = await axios.post('/api/users', data)
  dispatch(actions.loginUser(user))

  } catch (error) {
    // dispatch(actions.failed(error.data.response.message))    
    console.log(error.message)
    console.log(error.response.data.message)
  }
}