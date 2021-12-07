import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const calculateFuel = (positions, alignPos) => {
  return positions.reduce((fuel, pos) => fuel + Math.abs(pos - alignPos), 0)
}

const solve = (data) => {
  const positions = data.split(',').map((n) => Number(n))
  const [minAlignPos, maxAlignPos] = positions.reduce(
    ([min, max], pos) => [Math.min(min, pos), Math.max(max, pos)],
    [positions[0], positions[0]]
  )

  let minFuel

  for (let alignPos = minAlignPos; alignPos <= maxAlignPos; alignPos++) {
    const fuel = calculateFuel(positions, alignPos)
    if (!minFuel || fuel < minFuel) {
      minFuel = fuel
    }
  }

  return minFuel
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
