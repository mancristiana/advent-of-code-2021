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

const calculateLetterOccurence = (segmentPatterns) => {
  const occurence = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 }
  segmentPatterns
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

const findDigitBySignalsLength = (segmentPatternsString, length) => {
  return segmentPatternsString
    .split(' ')
    .find((digit) => digit.length === length)
}

const findA = (segmentPatternsString) => {
  const one = findDigitBySignalsLength(segmentPatternsString, 2)
  const seven = findDigitBySignalsLength(segmentPatternsString, 3)

  let a = seven
  one.split('').forEach((letter) => {
    a = a.replace(letter, '')
  })
  return a
}

const findC = (segmentPatternsString, letterF) => {
  const one = segmentPatternsString
    .split(' ')
    .find((digit) => digit.length === 2)
  return one.replace(letterF, '')
}

const findD = (segmentPatternsString, signalMap) => {
  const four = findDigitBySignalsLength(segmentPatternsString, 4)
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

const findSegmentNamesMap = (segmentPatternsString) => {
  const segmentMap = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }

  const letterOccurence = calculateLetterOccurence(segmentPatternsString)
  segmentMap.b = findLetter(letterOccurence, abcdefgOccurence.b)
  segmentMap.e = findLetter(letterOccurence, abcdefgOccurence.e)
  segmentMap.f = findLetter(letterOccurence, abcdefgOccurence.f)
  segmentMap.a = findA(segmentPatternsString)
  segmentMap.c = findC(segmentPatternsString, segmentMap.f)
  segmentMap.d = findD(segmentPatternsString, segmentMap)
  segmentMap.g = findG(segmentMap)
  return segmentMap
}

const getSevenSegmentDisplay = (segmentMap) => {
  return sevenSegmentDisplay.map((digit) => digit
    .split('')
    .map((letter) => segmentMap[letter])
    .sort()
    .join('')
  )
}

const getOutputDigits = (outputValuesString, correspondingSevenSegmentDisplay) => {
  const outputDigits = outputValuesString
    .split(' ')
    .map((digit) => {
      const sortedDigit = digit.split('').sort().join('')
      const x = correspondingSevenSegmentDisplay.findIndex(
        (signalDisplay) => signalDisplay === sortedDigit
      )
      return x
    })
    .join('')

    return Number(outputDigits)
}

const getOutput = (line) => {
  const [segmentPatternsString, outputValuesString] = line.split(' | ')
  const segmentMap = findSegmentNamesMap(segmentPatternsString)
  const correspondingSevenSegmentDisplay = getSevenSegmentDisplay(segmentMap)

  return getOutputDigits(outputValuesString, correspondingSevenSegmentDisplay)
}

const solve = (data) => {
  const lines = data.split('\n')
  return lines.reduce((sum, line) => sum + getOutput(line), 0)
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))



