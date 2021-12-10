import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const markBasin = (matrix, basinMap, rows, cols, i, j) => {
  if (matrix[i][j] === 9 || basinMap[i][j] === 1) {
    return
  }
  basinMap[i][j] = 1

  if (i - 1 >= 0) {
    markBasin(matrix, basinMap, rows, cols, i - 1, j)
  }
  if (i + 1 < rows) {
    markBasin(matrix, basinMap, rows, cols, i + 1, j)
  }
  if (j - 1 >= 0) {
    markBasin(matrix, basinMap, rows, cols, i, j - 1)
  }
  if (j + 1 < cols) {
    markBasin(matrix, basinMap, rows, cols, i, j + 1)
  }
}

const calculateBasinSize = (basinMap, rows, cols) => {
  let size = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      size += basinMap[i][j]
    }
  }
  return size
}

const findBasinSize = (matrix, rows, cols, i, j) => {
  const basinMap = new Array(rows)
  for (let k = 0; k < rows; k++) {
    basinMap[k] = new Array(cols).fill(0)
  }
  markBasin(matrix, basinMap, rows, cols, i, j)
  return calculateBasinSize(basinMap, rows, cols)
}

const isLowPoint = (matrix, rows, cols, i, j) => {
  if (i - 1 >= 0 && matrix[i][j] >= matrix[i - 1][j]) {
    return false
  }
  if (i + 1 < rows && matrix[i][j] >= matrix[i + 1][j]) {
    return false
  }
  if (j - 1 >= 0 && matrix[i][j] >= matrix[i][j - 1]) {
    return false
  }
  if (j + 1 < cols && matrix[i][j] >= matrix[i][j + 1]) {
    return false
  }

  return true
}

const solve = (data) => {
  const heightMatrix = data
    .split('\n')
    .map((row) => row.split('').map((height) => parseInt(height)))
  const rows = heightMatrix.length
  const cols = heightMatrix[0].length

  const basinSizes = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (isLowPoint(heightMatrix, rows, cols, i, j)) {
        basinSizes.push(findBasinSize(heightMatrix, rows, cols, i, j))
      }
    }
  }
  basinSizes.sort((a, b) => b - a)
  return basinSizes[0] * basinSizes[1] * basinSizes[2]
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
