interface IMismatch {
	mismatchMatrix: number[][]
	generalSum: number
	sums: number[]
}
export function useMismatch(matrixes: number[][][]): IMismatch {
	// Проверяем, что входной массив не пуст или содержит только одну матрицу
	if (!matrixes.length || matrixes.length < 2) {
		return {
			mismatchMatrix: [],
			generalSum: 0,
			sums: []
		}
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

	console.log('0M', mismatchMatrix)

	// Вычисляем количество расхождений для каждой пары матриц
	for (let i = 0; i < numberOfMatrices; i++) {
		// Внутренний цикл начинается с i + 1, чтобы не повторять вычисления для пар матриц (i, j) и (j, i)
		for (let j = i + 1; j < numberOfMatrices; j++) {
			let mismatchCount = 0
			// Проходим по каждому элементу обеих матриц и суммируем модули их разностей
			for (let row = 0; row < matrixSize; row++) {
				for (let col = 0; col < matrixSize; col++) {
					mismatchCount += Math.abs(
						matrixes[i][row][col] - matrixes[j][row][col]
					)
				}
			}
			// Записываем количество расхождений в соответствующие ячейки матрицы расхождений
			mismatchMatrix[i][j] = mismatchCount / 2
			mismatchMatrix[j][i] = mismatchCount / 2 // Зеркально заполняем для симметрии
		}
	}
	console.log('FULL M', mismatchMatrix)

	let sums: number[] = []
	for (let i = 0; i < mismatchMatrix.length; i++) {
		let sum = 0
		for (let j = 0; j < mismatchMatrix[i].length; j++) {
			sum += mismatchMatrix[i][j]
		}
		sums.push(sum)
	}

	let generalSum = 0
	sums.forEach(sum => (generalSum += sum))

	// Возвращаем полученную матрицу расхождений
	return { mismatchMatrix, generalSum, sums }
}
