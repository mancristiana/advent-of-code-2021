import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const incrementEnergyLevel = (matrix) => {
  matrix.forEach((row, i) => {
    row.forEach((energyLevel, j) => {
      matrix[i][j]++
    })
  })
}

const resetEnergyLevel = (matrix) => {
  matrix.forEach((row, i) => {
    row.forEach((energyLevel, j) => {
      if (energyLevel > 9) {
        matrix[i][j] = 0
      }
    })
  })
}

const getNeighbours = (rows, cols, i, j) => {
  const neighbours = []
  for (let ni = Math.max(0, i - 1); ni <= Math.min(rows - 1, i + 1); ni++) {
    for (let nj = Math.max(0, j - 1); nj <= Math.min(cols - 1, j + 1); nj++) {
      if (ni === i && nj === j) {
        continue
      }
      neighbours.push({ ni, nj })
    }
  }
  return neighbours
}

const flash = (matrix, flashMap, rows, cols, i, j) => {
  if (flashMap[i][j] === 1) {
    return
  }
  flashMap[i][j] = 1
  const neighbours = getNeighbours(rows, cols, i, j)
  neighbours.forEach(({ ni, nj }) => {
    matrix[ni][nj]++
    if (matrix[ni][nj] > 9) {
      flash(matrix, flashMap, rows, cols, ni, nj)
    }
  })
}

const initializeFlashMap = (rows, cols) => {
  const flashMap = new Array(rows)
  for (let k = 0; k < rows; k++) {
    flashMap[k] = new Array(cols).fill(0)
  }
  return flashMap
}

const sumFlashMap = (flashMap) => {
  let sum = 0
  flashMap.forEach((row) => {
    row.forEach((flash) => {
      sum += flash
    })
  })
  return sum
}

const countFlashes = (matrix, rows, cols) => {
  incrementEnergyLevel(matrix)
  const flashMap = initializeFlashMap(rows, cols)
  matrix.forEach((row, i) => {
    row.forEach((energyLevel, j) => {
      if (energyLevel > 9) {
        flash(matrix, flashMap, rows, cols, i, j)
      }
    })
  })

  resetEnergyLevel(matrix)
  const sum = sumFlashMap(flashMap)
  return sum
}

const solve = (data) => {
  const matrix = data
    .split('\n')
    .map((row) => row.split('').map((digit) => parseInt(digit)))
  const rows = matrix.length
  const cols = matrix[0].length

  let step = 1
  while (countFlashes(matrix, rows, cols) !== 100) {
    step++
  }

  return step
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
