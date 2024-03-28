export interface IMatrix {
	experts: number
	tasks: number
}
export enum MatrixTypesEnum {
	CORRELATION = 'Correlation Matrix',
	P0 = 'Agreement Matrix',
	ORDERING = 'Ordering Matrix',
	MISMATCH = 'Mismatch Matrix'
}
