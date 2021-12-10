import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

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

  let riskLevel = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (isLowPoint(heightMatrix, rows, cols, i, j)) {
        riskLevel += 1 + heightMatrix[i][j]
      }
    }
  }

  return riskLevel
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
