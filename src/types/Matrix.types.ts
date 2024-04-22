export interface IMatrix {
	experts: number
	tasks: number
}
export enum MatrixTypesEnum {
	CORRELATION = 'Матрица корреляции',
	P0 = 'Матрица графа',
	ORDERING = 'Матрица упорядочивания',
	MISMATCH = 'Матрица рассогласования'
}
