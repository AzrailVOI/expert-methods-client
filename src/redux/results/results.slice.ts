import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IResultPlane } from '../../types/ResultPlane.types.ts'

const initialState: IResultPlane[] = []
export const resultsSlice = createSlice({
	name: 'results',
	initialState,
	reducers: {
		addResult: (state, action: PayloadAction<IResultPlane>) => {
			const { label } = action.payload
			// Удаляем все предыдущие результаты с таким же label
			return state
				.filter(result => result.label !== label)
				.concat(action.payload)
		}
	}
})

export const { addResult } = resultsSlice.actions

export default resultsSlice.reducer
