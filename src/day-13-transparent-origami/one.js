import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getKey = (x, y) => `${x},${y}`

const foldLeft = (dots, line) => {
  Object.keys(dots)
  .forEach((key) => {
    const { x, y } = dots[key]
    if (x > line) {
      const newX = 2 * line - x
      dots[getKey(newX, y)] = { x: newX, y }
      delete dots[key]
    }
  })
}

const foldUp = (dots, line) => {
  Object.keys(dots)
    .forEach((key) => {
      const { x, y } = dots[key]
      if (y > line) {
        const newY = 2 * line - y
        dots[getKey(x, newY)] = { x, y: newY }
        delete dots[key]
      }
    })
}

const solve = (data) => {
  const [dotsString, instructionsString] = data.split('\n\n')
  const dots = {}
  dotsString.split('\n').map((dot) => {
    const [x, y] = dot.split(',').map((n) => parseInt(n))
    dots[dot] = { x, y }
  })

  const firstInstruction = instructionsString.split('\n')[0]
  const [axis, lineString] = firstInstruction
    .replace('fold along ', '')
    .split('=')
  const line = parseInt(lineString)
  if (axis === 'x') {
    foldLeft(dots, line)
  } else {
    foldUp(dots, line)
  }

  return Object.keys(dots).length
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
