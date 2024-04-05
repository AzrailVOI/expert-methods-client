import { Dispatch, SetStateAction } from 'react'

import { TypeMethods } from './Methods.types.ts'

export interface IThresholdContext {
	thresholds: number[]
	setThresholds: Dispatch<SetStateAction<number[]>>
	selectedThreshold: number
	setSelectedThreshold: Dispatch<SetStateAction<number>>
	currentMethod: TypeMethods
}
