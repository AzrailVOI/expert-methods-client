import { useEffect, useState } from 'react'

import styles from './App.module.scss'
import Matrix from './components/Matrix/Matrix.tsx'
import MatrixGraph from './components/MatrixGraph/MatrixGraph.tsx'
import MatrixParams from './components/MatrixParams/MatrixParams.tsx'
import ResultPlane from './components/ResultPlane/ResultPlane.tsx'
import ResultContext from './contexts/ResultContext.ts'
import ThresholdContext from './contexts/ThresholdContext.ts'
import { useMismatch } from './hook/useMismatch.ts'
import { IMatrix, MatrixTypesEnum } from './types/Matrix.types.ts'
import { TypeMethods } from './types/Methods.types.ts'
import { IResultPlane } from './types/ResultPlane.types.ts'

function App() {
	const [matrix, setMatrix] = useState<IMatrix>({
		experts: 1,
		tasks: 1
	})
	const [thresholds, setThresholds] = useState<number[]>([])
	const [selectedThreshold, setSelectedThreshold] = useState<number>(1)
	const [results, setResults] = useState<Array<IResultPlane>>([])
	const [method, setMethod] = useState<TypeMethods>('agreement')

	useEffect(() => {
		console.log(
			'mismatch\n',
			useMismatch(
				results
					.filter(result => result.label.includes(MatrixTypesEnum.ORDERING))
					.map(res => res.matrix)
			)
		)
	}, [
		results.filter(result => result.label.includes(MatrixTypesEnum.ORDERING))
	])
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
					<div>
						<Matrix
							experts={Number(matrix.experts)}
							tasks={Number(matrix.tasks)}
						/>
						<div>
							<h2>Current method: {method}</h2>
							<button
								className={styles.button}
								onClick={() => {
									setMethod(prev =>
										prev === 'agreement' ? 'mismatch' : 'agreement'
									)
								}}
							>
								{method === 'agreement'
									? 'Switch to mismatch method'
									: 'Switch to agreement method'}
							</button>
						</div>
						<ResultPlane
							results={results.filter(result => {
								if (method === 'agreement') {
									return (
										result.label === MatrixTypesEnum.P0 ||
										result.label === MatrixTypesEnum.CORRELATION
									)
								}
								if (method === 'mismatch') {
									return (
										result.label.includes(MatrixTypesEnum.ORDERING) ||
										result.label === MatrixTypesEnum.MISMATCH
									)
								}
							})}
						/>
						<div>
							<MatrixGraph
								matrix={
									results.find(result => result.label === MatrixTypesEnum.P0)
										?.matrix || []
								}
							/>
						</div>
					</div>

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
