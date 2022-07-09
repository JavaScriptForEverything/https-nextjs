import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import test from './middleware/testMiddleware'
import userReducer from './userReducer'
import productReducer from './productReducer'

const reducers = combineReducers({
  user: userReducer,
  product: productReducer
})

const masterReducer = (state, action) => {


	return (action.type === HYDRATE) ? {
			...state, 						// copy every slice here
			user: {
				...state.user, 			// copy user slice here
				user: { ...state.user.user, ...action.payload.user.user } 	// update user property of user slice.
			}
		} : reducers(state, action)

}




const makeStore = () => configureStore({
	reducer: masterReducer,
	middleware: (getMiddlewares) => [ ...getMiddlewares(), test('development:') ]
})


export const wrapper = createWrapper ( makeStore, { debug: false } )
