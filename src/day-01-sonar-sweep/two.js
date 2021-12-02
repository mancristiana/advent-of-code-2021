import { URL, fileURLToPath } from 'url'
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

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(getIncreaseCount(data))
