import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IThresholdContext } from '../../types/Threshold.types.ts'
import {TypeMethods} from "../../types/Methods.types.ts";

const initialState: IThresholdContext = {
	thresholds: [],
	selectedThreshold: 0,
	currentMethod: 'agreement'
}
export const thresholdsSlice = createSlice({
	name: 'thresholds',
	initialState,
	reducers: {
		setThresholds: (state, action: PayloadAction<number[]>) => {
			state.thresholds.length = 0 // Очистить существующий массив
			state.thresholds.push(...action.payload)
		},
        setSelectedThreshold: (state, action: PayloadAction<number>) => {
            state.selectedThreshold = action.payload
        },
        setCurrentMethod: (state, action: PayloadAction<TypeMethods>) => {
            state.currentMethod = action.payload
        }
	}
})

export const { setThresholds, setSelectedThreshold, setCurrentMethod } = thresholdsSlice.actions

export default thresholdsSlice.reducer
