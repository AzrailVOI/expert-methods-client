import { TypeMethods } from './Methods.types.ts'

export interface IThresholdContext {
	thresholds: number[]
	selectedThreshold: number
	currentMethod: TypeMethods
}
