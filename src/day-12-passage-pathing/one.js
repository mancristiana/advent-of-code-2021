import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'


const isSmallCave = (cave) => cave.toLowerCase() === cave

const getPaths = (links, visitedSmallCaves, paths, path, cave) => {
  if (cave === "end") {
    return paths + 1
  }

  let generatedPaths = 0
  links[cave].forEach(linkedCave => {
    if (!visitedSmallCaves.includes(linkedCave)) {
      const newVisitedArray = isSmallCave(linkedCave) ? [...visitedSmallCaves, linkedCave] : visitedSmallCaves
      generatedPaths += getPaths(links, newVisitedArray, paths, `${path},${linkedCave}`, linkedCave)
    }
  })
  return paths + generatedPaths
}

const addLink = (links, caveA, caveB) => {
  if (links[caveA]) {
    links[caveA].push(caveB)
  } else {
    links[caveA] = [caveB]
  }
}

const solve = (data) => {
  const links = {}
  const lines = data.split('\n')
  lines.forEach((line) => {
    const [caveA, caveB] = line.split('-')
    addLink(links, caveA, caveB)
    addLink(links, caveB, caveA)
  })
  return getPaths(links, ["start"], 0, "start", "start")
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
