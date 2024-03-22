import { useContext, useEffect, useState } from 'react'

import ThresholdContext from '../../contexts/ThresholdContext.ts'
import { useCorrelation } from '../../hook/useCorrelation.ts'
import { IMatrix } from '../../types/Matrix.types.ts'
import { IResultPlane } from '../../types/ResultPlane.types.ts'
import MatrixItem from '../MatrixItem/MatrixItem.tsx'
import ResultPlane from '../ResultPlane/ResultPlane.tsx'

import styles from './Matrix.module.scss'

export default function Matrix({ experts, tasks }: IMatrix) {
	const [matrix, setMatrix] = useState<number[][]>(() =>
		Array.from({ length: tasks }, () => Array(experts).fill(1))
	)
	const { setThresholds } = useContext(ThresholdContext)

	const [results, setResults] = useState<Array<IResultPlane>>([])
	const [isMatrixFilled, setIsMatrixFilled] = useState<boolean>(false)

	useEffect(() => {
		setMatrix(prevMatrix => {
			const newMatrix = Array.from({ length: tasks }, () =>
				Array(experts).fill(1)
			)
			// Copy the values from the previous matrix to the new one if the size has changed
			for (let i = 0; i < Math.min(tasks, prevMatrix.length); i++) {
				for (let j = 0; j < Math.min(experts, prevMatrix[i].length); j++) {
					newMatrix[i][j] = prevMatrix[i][j]
				}
			}
			return newMatrix
		})
	}, [experts, tasks])

	useEffect(() => {
		const filled = matrix.every(row => row.every(cell => cell !== null))
		setIsMatrixFilled(filled)
	}, [matrix])
	const handleCellChange = (
		value: number,
		rowIndex: number,
		columnIndex: number
	) => {
		const updatedMatrix = [...matrix]
		updatedMatrix[rowIndex][columnIndex] = value
		console.log('updated', updatedMatrix)
		setMatrix(updatedMatrix)
	}
	const { correlationMatrix, thresholdValues } = useCorrelation(matrix)
	useEffect(() => {
		setResults([{ label: 'Correlation Matrix', matrix: correlationMatrix }])
	}, [correlationMatrix])

	setThresholds(thresholdValues)

	return (
		<div>
			<div className={styles.matrix}>
				{matrix.map((row, rowIndex) => (
					<div key={rowIndex}>
						{row.map((cell, columnIndex) => (
							<MatrixItem
								isInput={true}
								key={`${rowIndex}_${columnIndex}`}
								value={cell}
								onChange={value =>
									handleCellChange(value, rowIndex, columnIndex)
								}
							/>
						))}
					</div>
				))}
			</div>
			<div>
				{isMatrixFilled ? 'All cells are filled' : 'Please fill all cells'}
			</div>
			<ResultPlane results={results} />
			<div>
				<h2>Threshold Values</h2>
				{thresholdValues.map(thresholdValue => (
					<div key={thresholdValue}>({thresholdValue})</div>
				))}
			</div>
		</div>
	)
}
