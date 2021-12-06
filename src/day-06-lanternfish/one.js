import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getNewFishPopulation = (fish) => {
  let newFishCount = 0
  const newFishPopulation = fish.map((f) => {
    if (f === 0) {
      newFishCount++
      return 6
    }
    return f - 1
  })
  newFishPopulation.push(...Array(newFishCount).fill(8))
  return newFishPopulation
}

const solve = (data) => {
  let fish = data.split(',').map((n) => Number(n))

  for (let day = 1; day <= 80; day++) {
    fish = getNewFishPopulation(fish)
  }
  return fish.length
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
