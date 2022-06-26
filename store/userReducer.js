import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: ''
  },
  reducers: {
    requested: (state, action) => ({
      ...state,
      loading: true,
      error: ''
    }),
    failed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload
    }),
  } // end of reducers
})
export default reducer