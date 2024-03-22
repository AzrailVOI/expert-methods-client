import { ChangeEvent } from 'react'

import styles from './MatrixItem.module.scss'

interface IMatrixItem {
	isInput: boolean
	value: number
	onChange?: (value: number) => void
}
export default function MatrixItem({ isInput, value, onChange }: IMatrixItem) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		const regex = /^[0-9]*$/ // Регулярное выражение, разрешающее только цифры

		if (regex.test(inputValue)) {
			if (onChange) {
				onChange(Number(inputValue))
			}
		}
	}

	return (
		<div className={styles.item}>
			{isInput ? (
				<input
					className={styles.input}
					type='text'
					onChange={handleChange}
					value={value}
				/>
			) : (
				<div>{value}</div>
			)}
		</div>
	)
}
