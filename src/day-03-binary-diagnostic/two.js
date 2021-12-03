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

  let oxigenRate = [...lines]
  let co2Rate = [...lines]

  let index = 0
  while (oxigenRate.length > 1) {
    const occurenceDifference = getOccurenceDifference(oxigenRate, index)
    const bitCriteria = occurenceDifference > 0 ? '0' : '1'
    oxigenRate = oxigenRate.filter((line) => line.charAt(index) === bitCriteria)
    index++
  }

  index = 0
  while (co2Rate.length > 1) {
    const occurenceDifference = getOccurenceDifference(co2Rate, index)
    const bitCriteria = occurenceDifference > 0 ? '1' : '0'
    co2Rate = co2Rate.filter((line) => line.charAt(index) === bitCriteria)
    index++
  }

  return parseInt(oxigenRate[0], 2) * parseInt(co2Rate[0], 2)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
