import { useContext, useEffect, useMemo, useState } from 'react'

import MismatchContext from '../../contexts/MismatchContext.ts'
import ResultContext from '../../contexts/ResultContext.ts'
import ThresholdContext from '../../contexts/ThresholdContext.ts'
import { useCorrelation } from '../../hook/useCorrelation.ts'
import { useMismatch } from '../../hook/useMismatch.ts'
import { useOrdering } from '../../hook/useOrdering.ts'
import { useP0 } from '../../hook/useP0.ts'
import { useThreshold } from '../../hook/useThreshold.ts'
import { useTranspose } from '../../hook/useTranspose.ts'
import { Alphabet } from '../../types/Alphabet.ts'
import { IMatrix, MatrixTypesEnum } from '../../types/Matrix.types.ts'
import MatrixItem from '../MatrixItem/MatrixItem.tsx'

import styles from './Matrix.module.scss'

export default function Matrix({ experts, tasks }: IMatrix) {
	const [matrix, setMatrix] = useState<number[][]>(() =>
		Array.from({ length: tasks }, () => Array(experts).fill(1))
	)
	const { setThresholds, selectedThreshold, currentMethod } =
		useContext(ThresholdContext)

	const { results, setResults } = useContext(ResultContext)
	const [isMatrixFilled, setIsMatrixFilled] = useState<boolean>(false)
	const { setSumsMismatch } = useContext(MismatchContext)

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
	const correlationMatrix = useMemo(() => useCorrelation(matrix), [matrix])

	const mismatchMatrix = useMemo(
		() =>
			useMismatch(
				results
					.filter(result => result.label.includes(MatrixTypesEnum.ORDERING))
					.map(res => res.matrix)
			).mismatchMatrix,
		[results]
	)
	console.log('mismatchMatrix', mismatchMatrix)
	const p0Matrix = useMemo(
		() =>
			useP0(
				currentMethod === 'agreement' ? correlationMatrix : mismatchMatrix,
				selectedThreshold,
				currentMethod
			).p0Matrix,
		[correlationMatrix, selectedThreshold, mismatchMatrix]
	)
	const thresholdValues = useMemo(
		() =>
			useThreshold(
				currentMethod === 'agreement' ? correlationMatrix : mismatchMatrix
			),
		[correlationMatrix, currentMethod]
	)
	const mismatchSums = useMemo(
		() =>
			useMismatch(
				results
					.filter(result => result.label.includes(MatrixTypesEnum.ORDERING))
					.map(res => res.matrix)
			).sums,
		[results]
	)
	const mismatchGeneralSum = useMemo(
		() =>
			useMismatch(
				results
					.filter(result => result.label.includes(MatrixTypesEnum.ORDERING))
					.map(res => res.matrix)
			).generalSum,
		[results]
	)

	useEffect(() => {
		setSumsMismatch({
			generalSum: mismatchGeneralSum,
			sums: mismatchSums
		})
	}, [mismatchGeneralSum, mismatchSums])
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

	useEffect(() => {
		const transposed = useTranspose(matrix)

		transposed.map((tasks, index) => {
			console.log(`ordering ${index}\n`, useOrdering(tasks))
			setResults(prevState => [
				...prevState.filter(
					prev =>
						!(prev.label === MatrixTypesEnum.ORDERING + ' ' + Alphabet[index])
				),
				{
					label: MatrixTypesEnum.ORDERING + ' ' + Alphabet[index],
					matrix: useOrdering(tasks).orderingMatrix
				}
			])
		})
	}, [matrix])

	useEffect(() => {
		setResults(prevState => [
			...prevState.filter(prev => !(prev.label === MatrixTypesEnum.MISMATCH)),
			{
				label: MatrixTypesEnum.MISMATCH,
				matrix: mismatchMatrix
			}
		])
	}, [matrix])

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
				{isMatrixFilled ? 'Все ячейки заполнены' : 'Не все ячейки заполнены'}
			</div>
		</div>
	)
}
