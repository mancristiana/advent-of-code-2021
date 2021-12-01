import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getIncreaseCount = (data) => {
  const depths = data.split('\n').map((i) => Number(i))
  let previousDepth = depths.shift()
  let increaseCount = 0

  depths.forEach((depth) => {
    if (depth - previousDepth > 0) {
      increaseCount += 1
    }
    previousDepth = depth
  })
  return increaseCount
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const inputPath = path.resolve(__dirname, 'input.txt')

const data = await readInput(inputPath)

console.log(getIncreaseCount(data))
