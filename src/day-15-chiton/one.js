import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getVisitedMapKey = (i, j) => `${i},${j}`
const addToVisitedMap = (visitedMap, i, j, riskLevel = 0) => {
  visitedMap[getVisitedMapKey(i, j)] = {
    i,
    j,
    riskLevel,
    isDone: false,
  }
}

const findLowestRiskNodeToVisit = (visitedMap) => {
  return Object.keys(visitedMap).reduce((minRiskLevelNode, key) => {
    const { isDone, riskLevel } = visitedMap[key]
    const { riskLevel: minRiskLevel } = minRiskLevelNode || {}
    if (!isDone && (!minRiskLevel || riskLevel < minRiskLevel)) {
      return visitedMap[key]
    }
    return minRiskLevelNode
  }, undefined)
}

const findNeighbours = (i, j, rows, cols) => {
  return [
    { i: i - 1, j },
    { i: i + 1, j },
    { i, j: j - 1 },
    { i, j: j + 1 },
  ].filter(({ i, j }) => 0 <= i && i < rows && 0 <= j && j < cols)
}

const solve = (data) => {
  const matrix = data
    .split('\n')
    .map((line) => line.split('').map((n) => parseInt(n)))

  const visitedMap = {}
  addToVisitedMap(visitedMap, 0, 0)

  const rows = matrix.length
  const cols = matrix[0].length
  const nodeCount = rows * cols

  let step = 0
  while (++step < nodeCount) {
    const node = findLowestRiskNodeToVisit(visitedMap)
    const neighbours = findNeighbours(node.i, node.j, rows, cols)
    neighbours.forEach(({i, j}) => {
      const visitedNeighbour = visitedMap[getVisitedMapKey(i, j)]
      const riskLevel = node.riskLevel + matrix[i][j]

      if (visitedNeighbour?.isDone) {
        return
      }
      if (!visitedNeighbour || visitedNeighbour.riskLevel > riskLevel) { 
        addToVisitedMap(visitedMap, i, j, riskLevel)
      }
    })
    node.isDone = true
  }
  return visitedMap[getVisitedMapKey(rows - 1, cols - 1)].riskLevel
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))