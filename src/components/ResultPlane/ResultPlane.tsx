import { IResultPlane } from '../../types/ResultPlane.types.ts'
import MatrixItem from '../MatrixItem/MatrixItem.tsx'

type Props = {
	results: Array<IResultPlane>
}
export default function ResultPlane({ results }: Props) {
	return (
		<div>
			{results.map((result, index) => (
				<div key={index}>
					<h2>{result.label}</h2>
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
