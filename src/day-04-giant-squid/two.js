import { URL, fileURLToPath } from 'url'
import { readInput } from '../utils/readInput.js'

const checkRow = (board, bingoNumberIndexOnBoard) => {
  const rowIndex = Math.floor(bingoNumberIndexOnBoard / 5)
  const reducer = (markedTotal, columnIndex) => {
    const boardIndex = rowIndex * 5 + columnIndex
    if (board[boardIndex].marked) {
      return markedTotal + 1
    }
    return markedTotal
  }
  const markedTotal = [0, 1, 2, 3, 4].reduce(reducer, 0)
  return markedTotal === 5
}

const checkColumn = (board, bingoNumberIndexOnBoard) => {
  const columnIndex = bingoNumberIndexOnBoard % 5
  const reducer = (markedTotal, rowIndex) => {
    const boardIndex = rowIndex * 5 + columnIndex
    if (board[boardIndex].marked) {
      return markedTotal + 1
    }
    return markedTotal
  }
  const markedTotal = [0, 1, 2, 3, 4].reduce(reducer, 0)
  return markedTotal === 5
}

const calculateScore = (board, bingoNumber) => {
  const boardScore = board.reduce((boardScore, item) => {
    if (item.marked) {
      return boardScore
    }
    return boardScore + item.number
  }, 0)
  return boardScore * bingoNumber
}

const solve = (data) => {
  const [bingoNumbersAsString, ...boardsAsString] = data.split('\n\n')
  const bingoNumbers = bingoNumbersAsString
    .split(',')
    .map((numberAsString) => Number(numberAsString))
  let boards = boardsAsString.map((boardAsString) => ({
    won: false,
    board: boardAsString
      .replaceAll('\n', ' ')
      .split(' ')
      .filter(Boolean)
      .map((numberAsString) => ({
        number: Number(numberAsString),
        marked: false,
      })),
  }))

  let lastWinningScore = 0

  bingoNumbers.forEach((bingoNumber) => {
    boards.forEach((boardObject) => {
      const { board, won } = boardObject
      if (won) {
        return
      }
      const bingoNumberOnBoard = board.find(
        (item) => item.number === bingoNumber
      )
      if (!bingoNumberOnBoard) {
        return
      }
      bingoNumberOnBoard.marked = true
      const bingoNumberIndexOnBoard = board.findIndex(
        (item) => item === bingoNumberOnBoard
      )
      const isRow = checkRow(board, bingoNumberIndexOnBoard)
      const isColumn = checkColumn(board, bingoNumberIndexOnBoard)
      const isWinner = isRow || isColumn
      if (isWinner) {
        boardObject.won = true
        lastWinningScore = calculateScore(board, bingoNumber)
      }
    })
  })

  return lastWinningScore
}

const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))

const data = await readInput(inputPath)

console.log(solve(data))
