import {Dispatch, SetStateAction} from "react";

export interface IResultPlane {
	label: string
	matrix: number[][]
}
export interface IResultPlaneContext{
	results: IResultPlane[]
	setResults: Dispatch<SetStateAction<IResultPlane[]>>
}
