import { Graph } from 'graphlib'
import { Graphviz } from 'graphviz-react'
import { FC } from 'react'

import styles from './MatrixGraph.module.scss'

interface IMatrixGraphProps {
	matrix: number[][]
}

const MatrixGraph: FC<IMatrixGraphProps> = ({ matrix }) => {
	// Создаем граф из матрицы
	const createGraphFromMatrix = (matrix: number[][]) => {
		const graph = new Graph()

		const expertsVariants = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
		const numExperts = matrix.length

		const experts = expertsVariants.slice(0, numExperts)

		// Добавляем вершины графа
		experts.map(expert => graph.setNode(expert))

		// Создаем ребра на основе матрицы
		for (let i = 0; i < numExperts; i++) {
			for (let j = 0; j < numExperts; j++) {
				if (matrix[i][j] === 1) {
					const source = experts[i]
					const target = experts[j]
					graph.setEdge(source, target)
				}
			}
		}

		// Формируем DOT-код на основе графа
		const formatGraphData = () => {
			let dotCode = 'digraph G {\n'

			// Добавляем вершины
			experts.forEach(expert => {
				dotCode += `  ${expert};\n`
			})

			// Добавляем ребра
			graph.edges().forEach(edge => {
				dotCode += `  ${edge.v} -> ${edge.w};\n`
			})

			dotCode += '  graph [style="transparent"];\n'
			dotCode += '}'

			return dotCode
		}

		return formatGraphData()
	}

	// Отображаем граф с помощью react-graph-vis
	const renderGraph = () => {
		// Опции для Graphviz
		const options = {
			width: 800,
			height: 400,
			format: 'png', // Указываем формат изображения (может потребоваться для прозрачного фона)
			engine: 'dot', // Указываем используемый движок (может потребоваться для прозрачного фона)
			G: {
				bgcolor: 'gray' // Устанавливаем прозрачный фон
			}
		}
		return (
			<div className={styles.graph}>
				<h2 style={{fontSize: '20pt'}}>Граф</h2>
				<Graphviz
					dot={createGraphFromMatrix(matrix)}
					options={options}
				/>
			</div>
		)
	}

	return <div>{renderGraph()}</div>
}

export default MatrixGraph
