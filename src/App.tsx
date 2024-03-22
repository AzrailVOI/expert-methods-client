import { useState } from 'react'

import styles from './App.module.scss'
import Matrix from './components/Matrix/Matrix.tsx'
import MatrixParams from './components/MatrixParams/MatrixParams.tsx'
import ThresholdContext from './contexts/ThresholdContext.ts'
import { IMatrix } from './types/Matrix.types.ts'

function App() {
	const [matrix, setMatrix] = useState<IMatrix>({
		experts: 1,
		tasks: 1
	})
	const [thresholds, setThresholds] = useState<number[]>([])
	const [selectedThreshold, setSelectedThreshold] = useState<number>(1)
	return (
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
	)
}

export default App
