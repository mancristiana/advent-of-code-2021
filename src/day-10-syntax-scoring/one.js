import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const illegalBracketScoring = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
}

const matchingBrackets = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">"
}

const isOpeningBracket = (bracket) => ["{", "[", "(", "<"].includes(bracket)
const isCorrectClosingBracket = (openingBracket, closingBracket) => {
  if (!openingBracket) {
    return false
  } 
  return matchingBrackets[openingBracket] === closingBracket
}

const getErrorScore = (line) => {
  const brackets = line.split('')
  const openBrackets = []
  let score = 0
  brackets.some(bracket => {
    if (isOpeningBracket(bracket)) {
      openBrackets.push(bracket)
    } else if(!isCorrectClosingBracket(openBrackets.pop(), bracket)) {
      score = illegalBracketScoring[bracket]
      return true 
    }
  })
  return score
}

const solve = (data) => {
  const lines = data.split('\n')
  return lines.reduce((sum, line) => sum + getErrorScore(line), 0)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
