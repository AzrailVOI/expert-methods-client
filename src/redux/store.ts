import { combineReducers, configureStore } from '@reduxjs/toolkit'

import resultsSlice from './results/results.slice.ts'
import thresholdsSlice from './thresholds/thresholds.slice.ts'

const reducers = combineReducers({
	thresholds: thresholdsSlice,
	results: resultsSlice
})
export const store = configureStore({
	reducer: reducers,
	devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
