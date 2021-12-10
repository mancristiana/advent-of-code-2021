import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

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
  if (!openingBracket) {
    return false
  } 
  return matchingBrackets[openingBracket] === closingBracket
}

const getOpeningBrackets = (line) => {
  const brackets = line.split('')
  const openingBrackets = []
  const hasError = brackets.some((bracket) => {
    if (isOpeningBracket(bracket)) {
      openingBrackets.push(bracket)
    } else if (!isCorrectClosingBracket(openingBrackets.pop(), bracket)) {
      return true
    }
  })

  return [hasError, openingBrackets]
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
    const [hasError, openingBrackets] = getOpeningBrackets(line)
    if (hasError) {
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
