import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getMostCommonBit = (lines, index) => {
  let occurenceDifference = 0
  lines.forEach((line) => {
    const bit = line.charAt(index)
    if (bit === '0') {
      occurenceDifference += 1
    } else {
      occurenceDifference -= 1
    }
  })
  const mostCommonBit = occurenceDifference > 0 ? '0' : '1'
  return mostCommonBit
}

const solve = (data) => {
  const lines = data.split('\n')
  const numberOfBits = lines[0].length
  let gammaRate = ''
  let epsilonRate = ''

  for (let i = 0; i < numberOfBits; i++) {
    const mostCommonBit = getMostCommonBit(lines, i)
    gammaRate += mostCommonBit
    epsilonRate += mostCommonBit === '0' ? '1' : '0'
  }

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
