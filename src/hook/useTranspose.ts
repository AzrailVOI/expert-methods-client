export const useTranspose = (matrix: number[][]): number[][] => {
	const transposedMatrix: number[][] = []

	// Создаем пустую матрицу для транспонированной матрицы
	for (let i = 0; i < matrix[0].length; i++) {
		transposedMatrix.push([])
	}

	// Заполняем транспонированную матрицу значениями из оригинальной
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			transposedMatrix[j].push(matrix[i][j])
		}
	}

	return transposedMatrix
}
