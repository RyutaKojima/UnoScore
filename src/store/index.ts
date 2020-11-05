import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import { gameSlice } from './game'

const rootReducer = combineReducers({
  game: gameSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootStateType = ReturnType<typeof store.getState>
