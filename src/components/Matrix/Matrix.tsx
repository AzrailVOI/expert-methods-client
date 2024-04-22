import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useCorrelation } from '../../hook/useCorrelation.ts'
import { useMismatch } from '../../hook/useMismatch.ts'
import { useOrdering } from '../../hook/useOrdering.ts'
import { useP0 } from '../../hook/useP0.ts'
import { useThreshold } from '../../hook/useThreshold.ts'
import { useTranspose } from '../../hook/useTranspose.ts'
import { useTypedSelector } from '../../hook/useTypedSelector.ts'
import { setSumsMismatch } from '../../redux/mismatch/mismatch.slice.ts'
import { addOrderingMatrix } from '../../redux/ordering/ordering.slice.ts'
import { addResult } from '../../redux/results/results.slice.ts'
import { setThresholds } from '../../redux/thresholds/thresholds.slice.ts'
import { Alphabet } from '../../types/Alphabet.ts'
import { IMatrix, MatrixTypesEnum } from '../../types/Matrix.types.ts'
import MatrixItem from '../MatrixItem/MatrixItem.tsx'

import styles from './Matrix.module.scss'

export default function Matrix({ experts, tasks }: IMatrix) {
	const [matrix, setMatrix] = useState<number[][]>(() =>
		Array.from({ length: tasks }, () => Array(experts).fill(1))
	)
	const dispatch = useDispatch()
	const { selectedThreshold, currentMethod } = useTypedSelector(
		state => state.thresholds
	)

	const [isMatrixFilled, setIsMatrixFilled] = useState<boolean>(false)
	const ordering = useTypedSelector(state => state.ordering)

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
		() => useMismatch(ordering.map(res => res.orderingMatrix)).mismatchMatrix,
		[ordering]
	)
	console.log('mismatchMatrix', mismatchMatrix)
	console.log('ordering', ordering)
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
		[correlationMatrix, currentMethod, mismatchMatrix]
	)
	console.log('thresholdValues', thresholdValues)
	const mismatchSums = useMemo(
		() => useMismatch(ordering.map(res => res.orderingMatrix)).sums,
		[ordering]
	)
	const mismatchGeneralSum = useMemo(
		() => useMismatch(ordering.map(res => res.orderingMatrix)).generalSum,
		[ordering]
	)

	useEffect(() => {
		dispatch(
			setSumsMismatch({
				generalSum: mismatchGeneralSum,
				sums: mismatchSums
			})
		)
	}, [mismatchGeneralSum, mismatchSums])
	useEffect(() => {
		dispatch(
			addResult({
				label: MatrixTypesEnum.CORRELATION,
				matrix: correlationMatrix
			})
		)
	}, [correlationMatrix])

	useEffect(() => {
		dispatch(setThresholds(thresholdValues))
	}, [thresholdValues])

	useEffect(() => {
		dispatch(
			addResult({
				label: MatrixTypesEnum.P0,
				matrix: p0Matrix
			})
		)
	}, [p0Matrix])

	useEffect(() => {
		const transposed = useTranspose(matrix)
		transposed.forEach((tasks, index) => {
			const orderingData = useOrdering(tasks)
			console.log(`ordering ${index}\n`, orderingData)
			dispatch(
				addResult({
					label: MatrixTypesEnum.ORDERING + ' ' + Alphabet[index],
					matrix: orderingData.orderingMatrix
				})
			)
			dispatch(
				addOrderingMatrix({
					orderingLetter: Alphabet[index],
					orderingMatrix: orderingData.orderingMatrix
				})
			)
		})
	}, [matrix])

	useEffect(() => {
		dispatch(
			addResult({
				label: MatrixTypesEnum.MISMATCH,
				matrix: mismatchMatrix
			})
		)
	}, [mismatchMatrix])

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
			<div style={{fontSize: '12pt'}}>
				{isMatrixFilled ? 'Все ячейки заполнены' : 'Не все ячейки заполнены'}
			</div>
		</div>
	)
}
