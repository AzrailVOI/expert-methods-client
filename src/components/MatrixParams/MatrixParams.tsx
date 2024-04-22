import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'

import { useTypedSelector } from '../../hook/useTypedSelector.ts'
import { setSelectedThreshold } from '../../redux/thresholds/thresholds.slice.ts'
import { IMatrix } from '../../types/Matrix.types.ts'

import styles from './MatrixParams.module.scss'

interface IMatrixParams {
	setMatrix: Dispatch<SetStateAction<IMatrix>>
	matrix: IMatrix
}

export default function MatrixParams({ setMatrix, matrix }: IMatrixParams) {
	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	const { thresholds } = useTypedSelector(state => state.thresholds)
	const dispatch = useDispatch()
	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		input: keyof IMatrix
	) => {
		const inputValue = e.target.value
		const regex = /([1-9][0-9]*$)/ // Регулярное выражение, разрешающее только цифры

		if (regex.test(inputValue) && Number(inputValue) < 100) {
			console.log('test', inputValue)
			setMatrix(prev => ({ ...prev, [input]: Number(inputValue) }))
		} else {
			console.log('test error', inputValue)
			setMatrix(prev => ({ ...prev, [input]: 1 }))
			e.target.select()
		}
	}

	const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value
		const regex = /^-?\d*\.?\d*$/
		if (regex.test(selectedValue)) {
			dispatch(setSelectedThreshold(Number(selectedValue)))
		}
	}

	return (
		<div>
			<form
				className={styles.form}
				onSubmit={(e: FormEvent<HTMLFormElement>) => submitHandler(e)}
			>
				<label>Введите количество экспертов</label>
				<input
					className={styles.element}
					type='text'
					value={matrix.experts}
					onChange={e => handleChange(e, 'experts')}
				/>
				<label>Введите количество задач</label>
				<input
					className={styles.element}
					type='text'
					value={matrix.tasks}
					onChange={e => handleChange(e, 'tasks')}
				/>
				{thresholds.length > 0 && (
					<>
						<label>Выберите пороговое значение</label>
						<select
							className={styles.element}
							onChange={selectHandler}
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
			</form>
		</div>
	)
}
