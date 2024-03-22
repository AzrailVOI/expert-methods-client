import { createContext } from 'react'
import {IResultPlaneContext} from "../types/ResultPlane.types.ts";


const ResultContext = createContext<IResultPlaneContext>({
	results: [],
	setResults: () => {},
})
export default ResultContext
