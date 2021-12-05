import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const addPointToHashMap = (hashMap, x, y) => {
  const key = `${x},${y}`
  if (hashMap[key]) {
    hashMap[key]++
  } else {
    hashMap[key] = 1
  }
}

const countOverlappingPoints = (hashMap) => {
  const points = Object.keys(hashMap)
  return points.reduce((total, point) => {
    if (hashMap[point] > 1) {
      return total + 1
    }
    return total
  }, 0)
}

const range = (c1, c2) => {
  const pointsCount = Math.abs(c1 - c2) + 1
  return [...Array(pointsCount).keys()].map((p) => {
    if (c1 < c2) {
      return c1 + p
    }
    return c1 - p
  })
}

const solve = (data) => {
  const lines = data.split('\n').map((line) =>
    line
      .replace(' -> ', ',')
      .split(',')
      .map((n) => Number(n))
  )

  const pointHashMap = {}

  lines.forEach((line) => {
    const [x1, y1, x2, y2] = line
    const isVertical = x1 === x2
    const isHorizontal = y1 === y2
    const isDiagonal = !isHorizontal && !isVertical

    if (isVertical) {
      const minY = Math.min(y1, y2)
      const maxY = Math.max(y1, y2)
      for (let y = minY; y <= maxY; y++) {
        addPointToHashMap(pointHashMap, x1, y)
      }
    }

    if (isHorizontal) {
      const minX = Math.min(x1, x2)
      const maxX = Math.max(x1, x2)
      for (let x = minX; x <= maxX; x++) {
        addPointToHashMap(pointHashMap, x, y1)
      }
    }

    if (isDiagonal) {
      const xRange = range(x1, x2)
      const yRange = range(y1, y2)
      xRange.forEach((x, index) => {
        const y = yRange[index]
        addPointToHashMap(pointHashMap, x, y)
      })
    }
  })

  return countOverlappingPoints(pointHashMap)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
