import { Dispatch, SetStateAction } from 'react'

export interface IThresholdContext {
	thresholds: number[]
	setThresholds: Dispatch<SetStateAction<number[]>>
	selectedThreshold: number
	setSelectedThreshold: Dispatch<SetStateAction<number>>
}
