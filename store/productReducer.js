import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const { reducer, actions } = createSlice({
	name: 'product',
	initialState: {
		loading: false,
		error: '',

		products: [{name: 'product name'}]
	},

	reducers: {
		setError: (state, action) => ({
			...state,
			error: action.payload
		})
	},
	extraReducers: {
		[HYDRATE]: (state, action) => ({
			...state,
			...action.payload
		})
	}

})
export default reducer

export const productReducer  = { ...actions }
// export { ...actions }
