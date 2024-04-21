import { combineReducers, configureStore } from '@reduxjs/toolkit'

import mismatchSlice from './mismatch/mismatch.slice.ts'
import orderingSlice from './ordering/ordering.slice.ts'
import resultsSlice from './results/results.slice.ts'
import thresholdsSlice from './thresholds/thresholds.slice.ts'

const reducers = combineReducers({
	thresholds: thresholdsSlice,
	results: resultsSlice,
	mismatch: mismatchSlice,
	ordering: orderingSlice
})
export const store = configureStore({
	reducer: reducers,
	devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
