import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getNewNumber = (number, addNumber) => {
  const newNumber = number + addNumber
  if (newNumber > 9) {
    return newNumber - 9
  }
  return newNumber
}

const addToMatrix = (matrix, rows, cols, tileI, tileJ, addNumber) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const newI = tileI * rows + i
      const newJ = tileJ * cols + j
      if (!matrix[newI]) {
        matrix[newI] = []
      }
      matrix[newI][newJ] = getNewNumber(matrix[i][j], addNumber)
    }
  }
}

const generateMatrixFromData = (data) => {
  const additionMatrix = [
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
  ]
  const matrix = data
    .split('\n')
    .map((line) => line.split('').map((n) => parseInt(n)))
  const rows = matrix.length
  const cols = matrix[0].length

  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      if (i === 0 && j === 0) {
        continue
      }
      addToMatrix(matrix, rows, cols, i, j, additionMatrix[i][j])
    }
  }
  return matrix
}

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
  const matrix = generateMatrixFromData(data)

  const visitedMap = {}
  addToVisitedMap(visitedMap, 0, 0)

  const rows = matrix.length
  const cols = matrix[0].length
  const nodeCount = rows * cols

  let step = 0
  while (++step < nodeCount) {
    if (step % 100 === 0) {
      console.log(step)
    }
    const node = findLowestRiskNodeToVisit(visitedMap)
    const neighbours = findNeighbours(node.i, node.j, rows, cols)
    // console.log("NODE =", node, neighbours)
    neighbours.forEach(({ i, j }) => {
      // console.log(i,j)
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
    // console.log(visitedMap)
  }
  return visitedMap[getVisitedMapKey(rows - 1, cols - 1)].riskLevel
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
