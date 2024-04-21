import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IResultPlane } from '../../types/ResultPlane.types.ts'

const initialState: IResultPlane = {
	label: '',
	matrix: []
}
export const resultsSlice = createSlice({
	name: 'results',
	initialState,
	reducers: {
		setResultLabel: (state, action: PayloadAction<string>) => {
			state.label = action.payload
		},
		setResultMatrix: (state, action: PayloadAction<number[][]>) => {
			state.matrix.length = 0
			state.matrix.push(...action.payload)
		}
	}
})

export const { setResultLabel, setResultMatrix } = resultsSlice.actions

export default resultsSlice.reducer
