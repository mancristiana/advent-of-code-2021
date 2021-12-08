import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const sevenSegmentDisplay = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
]
const abcdefgOccurence = { a: 8, b: 6, c: 8, d: 7, e: 4, f: 9, g: 7 }

const calculateLetterOccurence = (signalPatterns) => {
  const occurence = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 }
  signalPatterns
    .replaceAll(' ', '')
    .split('')
    .forEach((letter) => occurence[letter]++)

  return occurence
}

const findLetter = (letterOccurence, value) => {
  let letters = ''
  Object.keys(letterOccurence).forEach((letter) => {
    if (letterOccurence[letter] === value) {
      letters += letter
    }
  })

  return letters
}

const findDigitBySignalsLength = (signalPatternsString, length) => {
  return signalPatternsString
    .split(' ')
    .find((digit) => digit.length === length)
}

const findA = (signalPatternsString) => {
  const one = findDigitBySignalsLength(signalPatternsString, 2)
  const seven = findDigitBySignalsLength(signalPatternsString, 3)

  let a = seven
  one.split('').forEach((letter) => {
    a = a.replace(letter, '')
  })
  return a
}

const findC = (signalPatternsString, letterF) => {
  const one = signalPatternsString
    .split(' ')
    .find((digit) => digit.length === 2)
  return one.replace(letterF, '')
}

const findD = (signalPatternsString, signalMap) => {
  const four = findDigitBySignalsLength(signalPatternsString, 4)
  return four
    .replace(signalMap.b, '')
    .replace(signalMap.c, '')
    .replace(signalMap.f, '')
}

const findG = (signalMap) => {
  let allLetters = 'abcdefg'
  Object.keys(signalMap).forEach(
    (key) => (allLetters = allLetters.replace(signalMap[key], ''))
  )
  return allLetters
}

const findSignalMap = (signalPatternsString) => {
  const signalMap = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }

  const letterOccurence = calculateLetterOccurence(signalPatternsString)
  signalMap.b = findLetter(letterOccurence, abcdefgOccurence.b)
  signalMap.e = findLetter(letterOccurence, abcdefgOccurence.e)
  signalMap.f = findLetter(letterOccurence, abcdefgOccurence.f)
  signalMap.a = findA(signalPatternsString)
  signalMap.c = findC(signalPatternsString, signalMap.f)
  signalMap.d = findD(signalPatternsString, signalMap)
  signalMap.g = findG(signalMap)
  return signalMap
}

const getOutput = (line) => {
  const [signalPatternsString, digitsString] = line.split(' | ')
  const signalMap = findSignalMap(signalPatternsString)
  const correspondingSevenSignalDisplay = sevenSegmentDisplay.map((digit) =>
    digit
      .split('')
      .map((letter) => signalMap[letter])
      .sort()
      .join('')
  )
  const fourDigitsAsString = digitsString
    .split(' ')
    .map((digit) => {
      const sortedDigit = digit.split('').sort().join('')
      const x = correspondingSevenSignalDisplay.findIndex(
        (signalDisplay) => signalDisplay === sortedDigit
      )
      return x
    })
    .join('')

  return Number(fourDigitsAsString)
}

const solve = (data) => {
  const lines = data.split('\n')

  return lines.reduce((sum, line) => sum + getOutput(line), 0)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
