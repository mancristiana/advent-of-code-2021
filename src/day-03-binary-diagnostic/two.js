import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getOccurenceDifference = (lines, index) => {
  let occurenceDifference = 0
  lines.forEach((line) => {
    const bit = line.split('')[index]
    if (bit === '0') {
      occurenceDifference += 1
    } else {
      occurenceDifference -= 1
    }
  })
  return occurenceDifference
}

const solve = (data) => {
  const lines = data.split('\n')

  let oxygenRates = [...lines]
  let co2Rates = [...lines]

  let index = 0
  while (oxygenRates.length > 1) {
    const occurenceDifference = getOccurenceDifference(oxygenRates, index)
    const bitCriteria = occurenceDifference > 0 ? '0' : '1'
    oxygenRates = oxygenRates.filter((line) => line.charAt(index) === bitCriteria)
    index++
  }

  index = 0
  while (co2Rates.length > 1) {
    const occurenceDifference = getOccurenceDifference(co2Rates, index)
    const bitCriteria = occurenceDifference > 0 ? '1' : '0'
    co2Rates = co2Rates.filter((line) => line.charAt(index) === bitCriteria)
    index++
  }

  return parseInt(oxygenRates[0], 2) * parseInt(co2Rates[0], 2)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
