import { createContext } from 'react'

import { IThresholdContext } from '../types/Threshold.types.ts'

const ThresholdContext = createContext<IThresholdContext>({
	thresholds: [],
	setThresholds: () => {},
	selectedThreshold: 1,
	setSelectedThreshold: () => {}
})
export default ThresholdContext
