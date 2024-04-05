import { Dispatch, SetStateAction } from 'react'

export interface IMismatch {
	generalSum: number
	sums: number[]
}
export interface IMismatchContext extends IMismatch {
	setSumsMismatch: Dispatch<SetStateAction<IMismatch>>
}
