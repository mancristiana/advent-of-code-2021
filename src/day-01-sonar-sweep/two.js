import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getIncreaseCount = (data) => {
  const depths = data.split('\n').map((i) => Number(i))
  let increaseCount = 0

  for(let i = 0; i < depths.length - 2; i++) {
    if (depths[i + 3] - depths[i] > 0) {
      increaseCount += 1
    }
  }
  return increaseCount
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const inputPath = path.resolve(__dirname, 'input.txt')

const data = await readInput(inputPath)

console.log(getIncreaseCount(data))
