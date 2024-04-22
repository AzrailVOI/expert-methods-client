import { IResultPlane } from '../../types/ResultPlane.types.ts'
import MatrixItem from '../MatrixItem/MatrixItem.tsx'

import styles from './ResultPlane.module.scss'

type Props = {
	results: Array<IResultPlane>
}
export default function ResultPlane({ results }: Props) {
	return (
		<div className={styles.result}>
			{results.map((result, index) => (
				<div key={index}>
					<h2 className={styles.title}>{result.label}</h2>
					{result.matrix.map((row, rowIndex) => (
						<div key={rowIndex}>
							{row.map((cell, columnIndex) => (
								<MatrixItem
									isInput={false}
									key={`${rowIndex}_${columnIndex}`}
									value={cell}
								/>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	)
}
