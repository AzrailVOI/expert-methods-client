import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IResultPlane } from '../../types/ResultPlane.types.ts'
import { MatrixTypesEnum } from "../../types/Matrix.types.ts";

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
		},
		resetOrderingResult: (state) => {
			return state.filter(result => !result.label.includes(MatrixTypesEnum.ORDERING))
		}
	}
})

export const { addResult, resetOrderingResult } = resultsSlice.actions

export default resultsSlice.reducer
