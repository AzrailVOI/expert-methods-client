import { useState } from 'react'

import styles from './App.module.scss'
import Matrix from './components/Matrix/Matrix.tsx'
import MatrixGraph from './components/MatrixGraph/MatrixGraph.tsx'
import MatrixParams from './components/MatrixParams/MatrixParams.tsx'
import ResultPlane from './components/ResultPlane/ResultPlane.tsx'
import MismatchContext from './contexts/MismatchContext.ts'
import ResultContext from './contexts/ResultContext.ts'
import ThresholdContext from './contexts/ThresholdContext.ts'
import { Alphabet } from './types/Alphabet.ts'
import { IMatrix, MatrixTypesEnum } from './types/Matrix.types.ts'
import { TypeMethods } from './types/Methods.types.ts'
import { IMismatch } from './types/Mismatch.types.ts'
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
	const [sumsMismatch, setSumsMismatch] = useState<IMismatch>({
		generalSum: 0,
		sums: []
	})
	console.log('app')
	return (
		<ResultContext.Provider value={{ results, setResults }}>
			<MismatchContext.Provider value={{ ...sumsMismatch, setSumsMismatch }}>
				<ThresholdContext.Provider
					value={{
						thresholds,
						setThresholds,
						selectedThreshold,
						setSelectedThreshold,
						currentMethod: method
					}}
				>
					<div className={styles.page}>
						<div>
							<Matrix
								experts={Number(matrix.experts)}
								tasks={Number(matrix.tasks)}
							/>
							<div>
								<h2>Текущий метод: {method}</h2>
								<button
									className={styles.button}
									onClick={() => {
										setMethod(prev =>
											prev === 'agreement' ? 'mismatch' : 'agreement'
										)
									}}
								>
									{method === 'agreement'
										? 'Переключить на метод расхождения'
										: 'Переключить на метод согласования'}
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
											result.label === MatrixTypesEnum.MISMATCH ||
											result.label === MatrixTypesEnum.P0
										)
									}
								})}
							/>
							{method === 'mismatch' && (
								<>
									<h1>Degrees of mismatch</h1>
									{sumsMismatch.sums.map((sum, index) => (
										<div key={index}>
											Степень рассогласования эксперта {Alphabet[index]}: {sum}
										</div>
									))}
									<div>
										Общая степень рассогласования: {sumsMismatch.generalSum}
									</div>
								</>
							)}
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
			</MismatchContext.Provider>
		</ResultContext.Provider>
	)
}

export default App
