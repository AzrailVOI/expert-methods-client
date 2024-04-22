export function useCorrelation(matrixValues: number[][]) {
	if (!matrixValues.length) {
		return []
	}
	const m = matrixValues.length // Количество задач
	const n = matrixValues[0].length // Количество экспертов
	// Вычисляем матрицу корреляции
	const correlationMatrix: number[][] = []

	for (let i = 0; i < n; i++) {
		const correlationRow: number[] = []
		for (let j = 0; j < n; j++) {
			if (i === j) {
				correlationRow.push(1) // Коэффициент корреляции эксперта с самим собой равен 1
			} else {
				let sumDiffSquared = 0
				for (let k = 0; k < m; k++) {
					const diff = matrixValues[k][i] - matrixValues[k][j]
					sumDiffSquared += Math.pow(diff, 2)
				}
				const numerator = 6 * sumDiffSquared
				const denominator = Math.pow(m, 3) - m
				const correlation = 1 - numerator / denominator
				correlationRow.push(parseFloat(correlation.toFixed(2))) // Округляем до двух знаков после запятой и добавляем в матрицу
			}
		}
		correlationMatrix.push(correlationRow)
	}
	return correlationMatrix
}
