import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IMismatch } from '../../types/Mismatch.types.ts'

const initialState: IMismatch = {
	generalSum: 0,
	sums: []
}
export const mismatchSlice = createSlice({
	name: 'mismatch',
	initialState,
	reducers: {
		setSumsMismatch: (state, action: PayloadAction<IMismatch>) => {
			state.generalSum = action.payload.generalSum
			state.sums = action.payload.sums
		}
	}
})

export const { setSumsMismatch } = mismatchSlice.actions

export default mismatchSlice.reducer
