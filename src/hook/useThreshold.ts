export function useThreshold(matrix: number[][]): number[] {
	if (!matrix.length || !matrix[0].length) {
		return []
	}
	const thresholdValues: number[] = []
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			thresholdValues.push(parseFloat(matrix[i][j].toFixed(2)))
		}
	}
	console.log('thresholdValues', thresholdValues)
	return [...new Set(thresholdValues)].sort()
}
