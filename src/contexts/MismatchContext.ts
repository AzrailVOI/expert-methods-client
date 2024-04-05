import { createContext } from 'react'

import { IMismatchContext } from '../types/Mismatch.types.ts'

const MismatchContext = createContext<IMismatchContext>({
	generalSum: 0,
	sums: [],
	setSumsMismatch: () => {}
})
export default MismatchContext
