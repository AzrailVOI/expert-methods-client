import { TypeMethods } from '../types/Methods.types.ts'

interface IP0 {
	p0Matrix: number[][]
}
export const useP0 = (
	matrixValues: number[][],
	selectedThreshold: number,
	currentMethod: TypeMethods
): IP0 => {
	if (!matrixValues.length) {
		return {
			p0Matrix: []
		}
	}
	// Вычисляем матрицу корреляции
	const p0Matrix: number[][] = []

	for (let i = 0; i < matrixValues.length; i++) {
		const p0Row: number[] = []
		for (let j = 0; j < matrixValues.length; j++) {
			if (i === j) {
				p0Row.push(1) // Коэффициент корреляции эксперта с самим собой равен 1
			} else {
				if (currentMethod === 'agreement') {
					if (matrixValues[i][j] >= selectedThreshold) {
						p0Row.push(1)
					} else {
						p0Row.push(0)
					}
				} else {
					if (matrixValues[i][j] <= selectedThreshold) {
						p0Row.push(1)
					} else {
						p0Row.push(0)
					}
				}
			}
		}
		p0Matrix.push(p0Row)
	}
	return {
		p0Matrix
	}
}
