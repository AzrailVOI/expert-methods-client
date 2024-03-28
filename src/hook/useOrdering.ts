export function useOrdering(tasks: number[]) {
	if (!tasks.length) {
		return {
			orderingMatrix: []
		}
	}
	// Вычисляем матрицу корреляции
	const orderingMatrix: number[][] = []

	for (let i = 0; i < tasks.length; i++) {
		const orderingRow: number[] = []
		for (let j = 0; j < tasks.length; j++) {
			if (i === j) {
				orderingRow.push(0) // Коэффициент корреляции эксперта с самим собой равен 1
			} else {
				if (tasks[i] < tasks[j]) {
					orderingRow.push(1)
				} else {
					orderingRow.push(-1)
				}
			}
		}
		orderingMatrix.push(orderingRow)
	}
	return {
		orderingMatrix
	}
}
