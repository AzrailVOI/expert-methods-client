import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useContext
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import ThresholdContext from '../../contexts/ThresholdContext.ts'
import { IMatrix } from '../../types/Matrix.types.ts'

import styles from './MatrixParams.module.scss'

interface IMatrixParams {
	setMatrix: Dispatch<SetStateAction<IMatrix>>
	matrix: IMatrix
}
export default function MatrixParams({ setMatrix, matrix }: IMatrixParams) {
	const { register, setValue, handleSubmit } = useForm<IMatrix>()
	const submitHandler: SubmitHandler<IMatrix> = data => {
		console.log('form', data)
		setMatrix(data)
	}
	const { thresholds, setSelectedThreshold } = useContext(ThresholdContext)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		input: keyof IMatrix
	) => {
		const inputValue = e.target.value
		const regex = /^[0-9]*$/ // Регулярное выражение, разрешающее только цифры

		if (regex.test(inputValue)) {
			setValue(input, Number(inputValue))
			setMatrix(prev => ({ ...prev, [input]: Number(inputValue) }))
		}
	}
	function selectHandler(e: SyntheticEvent<HTMLSelectElement>) {
		console.log(e.target)
	}
	return (
		<div>
			<form
				className={styles.form}
				onSubmit={handleSubmit(submitHandler)}
			>
				<label>Enter experts count</label>
				<input
					className={styles.element}
					type='text'
					{...register('experts')}
					value={matrix.experts}
					onChange={e => handleChange(e, 'experts')}
				/>
				<label>Enter tasks count</label>
				<input
					className={styles.element}
					type='text'
					{...register('tasks')}
					value={matrix.tasks}
					onChange={e => handleChange(e, 'tasks')}
				/>
				{thresholds.length > 0 && (
					<>
						<label>Select threshold value</label>
						<select
							className={styles.element}
							onSelect={e => selectHandler(e)}
						>
							{thresholds.map((value, index) => (
								<option
									key={index}
									value={value}
								>
									{value}
								</option>
							))}
						</select>
					</>
				)}
				{/*<input*/}
				{/*	type='submit'*/}
				{/*	name={'submit'}*/}
				{/*	value={'Submit'}*/}
				{/*/>*/}
			</form>
		</div>
	)
}
