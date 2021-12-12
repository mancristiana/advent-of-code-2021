import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'


const isSmallCave = (cave) => cave.toLowerCase() === cave

const hasVisitedCave = (visited, cave) => {
  if (cave === "start") {
    return true
  }
  return visited.includes(cave) && visited.includes("twice")
}

const getVisitedCaves = (visited, cave) => {
  const isSmall = isSmallCave(cave)
  if (!isSmall) {
    return visited
  }
  if (visited.includes(cave)) {
    return [...visited, "twice"]
  }
  return [...visited, cave]
}

const getPaths = (links, visitedSmallCaves, cave) => {
  if (cave === "end") {
    return 1
  }

  let generatedPaths = 0
  links[cave].forEach(linkedCave => {
    if (!hasVisitedCave(visitedSmallCaves, linkedCave)) {
      generatedPaths += getPaths(links, getVisitedCaves(visitedSmallCaves, linkedCave), linkedCave)
    }
  })
  return generatedPaths
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
  const paths = getPaths(links, ["start"], "start")
  return paths
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
