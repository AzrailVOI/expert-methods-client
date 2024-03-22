import { useContext, useEffect, useMemo, useState } from 'react'

import ResultContext from '../../contexts/ResultContext.ts'
import ThresholdContext from '../../contexts/ThresholdContext.ts'
import { useCorrelation } from '../../hook/useCorrelation.ts'
import { useP0 } from '../../hook/useP0.ts'
import { IMatrix, MatrixTypesEnum } from '../../types/Matrix.types.ts'
import MatrixGraph from '../MatrixGraph/MatrixGraph.tsx'
import MatrixItem from '../MatrixItem/MatrixItem.tsx'
import ResultPlane from '../ResultPlane/ResultPlane.tsx'

import styles from './Matrix.module.scss'

export default function Matrix({ experts, tasks }: IMatrix) {
	const [matrix, setMatrix] = useState<number[][]>(() =>
		Array.from({ length: tasks }, () => Array(experts).fill(1))
	)
	const { setThresholds, selectedThreshold } = useContext(ThresholdContext)

	const { results, setResults } = useContext(ResultContext)
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
	const correlationMatrix = useMemo(
		() => useCorrelation(matrix).correlationMatrix,
		[matrix]
	)
	const thresholdValues = useMemo(
		() => useCorrelation(matrix).thresholdValues,
		[matrix]
	)

	const p0Matrix = useMemo(
		() => useP0(correlationMatrix, selectedThreshold).p0Matrix,
		[correlationMatrix, selectedThreshold]
	)
	useEffect(() => {
		setResults(prevState => [
			...prevState.filter(
				prev => !(prev.label === MatrixTypesEnum.CORRELATION)
			),
			{ label: MatrixTypesEnum.CORRELATION, matrix: correlationMatrix }
		])
	}, [correlationMatrix])

	useEffect(() => {
		setThresholds(thresholdValues)
	}, [thresholdValues])

	useEffect(() => {
		setResults(prevState => [
			...prevState.filter(prev => !(prev.label === MatrixTypesEnum.P0)),
			{ label: MatrixTypesEnum.P0, matrix: p0Matrix }
		])
	}, [p0Matrix])

	// setThresholds(thresholdValues)

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
				<MatrixGraph matrix={p0Matrix} />
			</div>
		</div>
	)
}
