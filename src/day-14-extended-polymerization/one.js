import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const getPairInsertionRules = (pairInsertionRulesData) => {
  const pairInsertionRules = {}
  pairInsertionRulesData.split('\n').forEach((line) => {
    const [pair, result] = line.split(' -> ')
    pairInsertionRules[pair] = result
  })
  return pairInsertionRules
}

const addToOccurenceMap = (occurenceMap, key, value = 1) => {
  if (occurenceMap[key]) {
    occurenceMap[key] += value
  } else {
    occurenceMap[key] = value
  }
}

const getPairOccurenceMap = (template) => {
  const pairs = {}
  for (let i = 0; i < template.length - 1; ++i) {
    addToOccurenceMap(pairs, `${template.charAt(i)}${template.charAt(i + 1)}`)
  }

  return pairs
}

const updatePairOccurenceMap = (pairOccurenceMap, pairInsertionRules) => {
  const newPairOccurenceMap = {}
  Object.keys(pairOccurenceMap).forEach((pair) => {
    const occurences = pairOccurenceMap[pair]
    const polymer = pairInsertionRules[pair]
    if (polymer) {
      addToOccurenceMap(
        newPairOccurenceMap,
        `${pair.charAt(0)}${polymer}`,
        occurences
      )
      addToOccurenceMap(
        newPairOccurenceMap,
        `${polymer}${pair.charAt(1)}`,
        occurences
      )
    } else {
      addToOccurenceMap(newPairOccurenceMap, pair, occurences)
    }
  })
  return newPairOccurenceMap
}

const getPolymerOccurenceMap = (pairOccurenceMap, template) => {
  const occurenceMap = {}
  Object.keys(pairOccurenceMap).forEach(pair => {
    addToOccurenceMap(occurenceMap, pair.charAt(0), pairOccurenceMap[pair])
    addToOccurenceMap(occurenceMap, pair.charAt(1), pairOccurenceMap[pair])
  })

  occurenceMap[template.charAt(0)]++
  occurenceMap[template.charAt(template.length - 1)]++

  Object.keys(occurenceMap).forEach(key => {
    occurenceMap[key] = Math.floor(occurenceMap[key] / 2)
  })
  return occurenceMap
}

const getLeastAndMostCommon = (occurenceMap) => {
  let leastCommon
  let mostCommon

  Object.keys(occurenceMap).forEach((polymer) => {
    if (!leastCommon || occurenceMap[leastCommon] > occurenceMap[polymer]) {
      leastCommon = polymer
    }
    if (!mostCommon || occurenceMap[mostCommon] < occurenceMap[polymer]) {
      mostCommon = polymer
    }
  })

  return { leastCommon, mostCommon }
}

const solve = (data) => {
  const [template, pairInsertionRulesData] = data.split('\n\n')
  const pairInsertionRules = getPairInsertionRules(pairInsertionRulesData)
  let pairOccurenceMap = getPairOccurenceMap(template)

  for (let i = 0; i < 40; ++i) {
    pairOccurenceMap = updatePairOccurenceMap(
      pairOccurenceMap,
      pairInsertionRules
    )
  }

  const polymerOccurenceMap = getPolymerOccurenceMap(pairOccurenceMap, template)
  const { leastCommon, mostCommon } = getLeastAndMostCommon(polymerOccurenceMap)
  return polymerOccurenceMap[mostCommon] - polymerOccurenceMap[leastCommon]
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
