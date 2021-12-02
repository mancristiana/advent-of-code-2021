import { fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const solve = (data) => {
  const commands = data.split('\n')
  let depth = 0
  let horizontalPosition = 0
  let aim = 0

  commands.forEach((command) => {
    const [type, stepsAsString] = command.split(' ')
    const steps = Number(stepsAsString)

    switch (type) {
      case 'forward':
        horizontalPosition += steps
        depth += aim * steps
        break
      case 'down':
        aim += steps
        break
      case 'up':
        aim -= steps
        break
      default:
        break
    }
  })
  return depth * horizontalPosition
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
