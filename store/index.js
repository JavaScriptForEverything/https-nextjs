import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import userReducer from './userReducer'

const reducer = combineReducers({
  users: userReducer
})

export const wrapper = createWrapper ( () => configureStore({ reducer }) )