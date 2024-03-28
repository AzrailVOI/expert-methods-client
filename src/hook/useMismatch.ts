export function useMismatch(matrixes: number[][][]): number[][] {
	// Проверяем, что входной массив не пуст или содержит только одну матрицу
	if (!matrixes.length || matrixes.length < 2) {
		return []
	}

	// Получаем количество матриц во входном массиве
	const numberOfMatrices = matrixes.length

	// Предполагаем, что все матрицы имеют одинаковый размер, поэтому берем размер первой матрицы
	const matrixSize = matrixes[0].length

	// Создаем матрицу для хранения количества расхождений, заполняем ее нулями
	const mismatchMatrix: number[][] = Array.from(
		{ length: numberOfMatrices },
		() => Array(numberOfMatrices).fill(0)
	)

	// Вычисляем количество расхождений для каждой пары матриц
	for (let i = 0; i < numberOfMatrices; i++) {
		// Внутренний цикл начинается с i + 1, чтобы не повторять вычисления для пар матриц (i, j) и (j, i)
		for (let j = i + 1; j < numberOfMatrices; j++) {
			let mismatchCount = 0
			// Проходим по каждому элементу обеих матриц и суммируем модули их разностей
			for (let row = 0; row < matrixSize; row++) {
				for (let col = 0; col < matrixSize; col++) {
					mismatchCount += Math.abs(
						(matrixes[i][row][col] - matrixes[j][row][col]) / 2
					)
				}
			}
			// Записываем количество расхождений в соответствующие ячейки матрицы расхождений
			mismatchMatrix[i][j] = mismatchCount
			mismatchMatrix[j][i] = mismatchCount // Зеркально заполняем для симметрии
		}
	}

	// Возвращаем полученную матрицу расхождений
	return mismatchMatrix
}
