import { useState } from 'react'

import styles from './App.module.scss'
import Matrix from './components/Matrix/Matrix.tsx'
import MatrixParams from './components/MatrixParams/MatrixParams.tsx'
import ResultContext from './contexts/ResultContext.ts'
import ThresholdContext from './contexts/ThresholdContext.ts'
import { IMatrix } from './types/Matrix.types.ts'
import { IResultPlane } from './types/ResultPlane.types.ts'

function App() {
	const [matrix, setMatrix] = useState<IMatrix>({
		experts: 1,
		tasks: 1
	})
	const [thresholds, setThresholds] = useState<number[]>([])
	const [selectedThreshold, setSelectedThreshold] = useState<number>(1)
	const [results, setResults] = useState<Array<IResultPlane>>([])

	return (
		<ResultContext.Provider value={{ results, setResults }}>
			<ThresholdContext.Provider
				value={{
					thresholds,
					setThresholds,
					selectedThreshold,
					setSelectedThreshold
				}}
			>
				<div className={styles.page}>
					<Matrix
						experts={Number(matrix.experts)}
						tasks={Number(matrix.tasks)}
					/>
					<MatrixParams
						matrix={matrix}
						setMatrix={setMatrix}
					/>
				</div>
			</ThresholdContext.Provider>
		</ResultContext.Provider>
	)
}

export default App
