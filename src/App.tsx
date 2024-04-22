import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import styles from './App.module.scss'
import Matrix from './components/Matrix/Matrix.tsx'
import MatrixGraph from './components/MatrixGraph/MatrixGraph.tsx'
import MatrixParams from './components/MatrixParams/MatrixParams.tsx'
import ResultPlane from './components/ResultPlane/ResultPlane.tsx'
import { useTypedSelector } from './hook/useTypedSelector.ts'
import { setCurrentMethod } from './redux/thresholds/thresholds.slice.ts'
import { Alphabet } from './types/Alphabet.ts'
import { IMatrix, MatrixTypesEnum } from './types/Matrix.types.ts'

function App() {
	const [matrix, setMatrix] = useState<IMatrix>({
		experts: 1,
		tasks: 1
	})
	const { currentMethod } = useTypedSelector(state => state.thresholds)
	const results = useTypedSelector(state => state.results)
	const sumsMismatch = useTypedSelector(state => state.mismatch)
	const dispatch = useDispatch()
	console.log('results', results)
	useEffect(() => {
		console.log('results', results)
	}, [results])
	return (
		<div className={styles.page}>
			<div>
				<Matrix
					experts={Number(matrix.experts)}
					tasks={Number(matrix.tasks)}
				/>
				<div>
					<h2 className={styles.title}>
						Текущий метод:{' '}
						{currentMethod === 'agreement' ? 'согласованиe' : 'рассогласование'}
					</h2>
					<button
						className={styles.button}
						onClick={() => {
							dispatch(
								setCurrentMethod(
									currentMethod === 'agreement' ? 'mismatch' : 'agreement'
								)
							)
						}}
					>
						{currentMethod === 'agreement'
							? 'Переключить на метод рассогласования'
							: 'Переключить на метод согласования'}
					</button>
				</div>
				<ResultPlane
					results={results.filter(result => {
						if (currentMethod === 'agreement') {
							return (
								result.label === MatrixTypesEnum.P0 ||
								result.label === MatrixTypesEnum.CORRELATION
							)
						}
						if (currentMethod === 'mismatch') {
							return (
								result.label.includes(MatrixTypesEnum.ORDERING) ||
								result.label === MatrixTypesEnum.MISMATCH ||
								result.label === MatrixTypesEnum.P0
							)
						}
					})}
				/>
				{currentMethod === 'mismatch' && (
					<>
						<h1 className={styles.title}>Степени рассогласования</h1>
						{sumsMismatch.sums.map((sum, index) => (
							<div key={index} className={styles.subtitle}>
								Степень рассогласования эксперта {Alphabet[index]}: {sum}
							</div>
						))}
						<div className={styles.subtitle}>Общая степень рассогласования: {sumsMismatch.generalSum}</div>
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
	)
}

export default App
