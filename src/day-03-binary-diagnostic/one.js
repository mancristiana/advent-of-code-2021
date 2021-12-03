import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const solve = (data) => {
  const lines = data.split('\n')
  const numberOfBits = lines[0].length
  const occurenceDifferences = Array(numberOfBits).fill(0)
  let gammaRate = ''
  let epsilonRate = ''

  lines.forEach((line) => {
    line.split('').forEach((bit, index) => {
      if (bit === '0') {
        occurenceDifferences[index] += 1
      } else {
        occurenceDifferences[index] -= 1
      }
    })
  })

  occurenceDifferences.forEach((occurenceDifference) => {
    if (occurenceDifference > 0) {
      gammaRate += '0'
      epsilonRate += '1'
    } else {
      gammaRate += '1'
      epsilonRate += '0'
    }
  })

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
