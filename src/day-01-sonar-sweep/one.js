import { URL, fileURLToPath } from 'url'
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

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(getIncreaseCount(data))
