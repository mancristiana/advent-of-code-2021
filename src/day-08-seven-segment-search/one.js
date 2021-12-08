import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const solve = (data) => {
  const lines = data.split('\n')
  const outputValues = lines.map((line) => line.split(' | ')[1])

  return outputValues.reduce((digitCount, outputValue) => {
    const digits = outputValue.split(" ")
  
    return digitCount + digits.reduce((count, digit) => {
      if([2, 4, 3, 7].includes(digit.length)) {
        return count + 1
      }
      return count
    },0)

  }, 0)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
