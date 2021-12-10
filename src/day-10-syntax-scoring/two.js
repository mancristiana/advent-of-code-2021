import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const illegalBracketScoring = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const completionScoring = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const matchingBrackets = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const isOpeningBracket = (bracket) => ['{', '[', '(', '<'].includes(bracket)
const isCorrectClosingBracket = (openingBracket, closingBracket) => {
  if (openingBracket) {
    return matchingBrackets[openingBracket] === closingBracket
  } else {
    return false
  }
}

const getOpeningBrackets = (line) => {
  const brackets = line.split('')
  const openingBrackets = []
  let score = 0
  brackets.some((bracket) => {
    if (isOpeningBracket(bracket)) {
      openingBrackets.push(bracket)
    } else if (!isCorrectClosingBracket(openingBrackets.pop(), bracket)) {
      score = illegalBracketScoring[bracket]
      return true
    }
  })

  return [score === 0, openingBrackets]
}

const getCompletionScore = (openingBrackets) => {
  return openingBrackets
    .reverse()
    .reduce(
      (score, bracket) =>
        score * 5 + completionScoring[matchingBrackets[bracket]],
      0
    )
}

const solve = (data) => {
  const lines = data.split('\n')
  const completedLineScores = lines.reduce((completed, line) => {
    const [isCorrect, openingBrackets] = getOpeningBrackets(line)
    if (!isCorrect) {
      return completed
    } else {
      return [...completed, getCompletionScore(openingBrackets)]
    }
  }, [])
  completedLineScores.sort((a, b) => a - b)
  const middleIndex = Math.floor(completedLineScores.length / 2)
  return completedLineScores[middleIndex]
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
