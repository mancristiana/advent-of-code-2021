import path, { dirname } from 'path'
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

const __dirname = dirname(fileURLToPath(import.meta.url))
const inputPath = path.resolve(__dirname, 'input.txt')

const data = await readInput(inputPath)

console.log(solve(data))
