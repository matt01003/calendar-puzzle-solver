import pieces from "./pieces"
import { defaultBoard as board } from "./config"

const boardWidth = board[0].length
const boardHeight = board.length

const canPlace = (board, row, col, piece) => {
  const pieceWidth = piece[0].length
  const pieceHeight = piece.length

  for (let i = 0; i < pieceHeight; i++) {
    for (let j = 0; j < pieceWidth; j++) {
      if (board[row + i][col + j] !== "." && piece[i][j] !== ".") {
        return false
      }
    }
  }
  return true
}

const placePiece = (board, row, col, piece) => {
  const pieceWidth = piece[0].length
  const pieceHeight = piece.length

  for (let i = 0; i < pieceHeight; i++) {
    for (let j = 0; j < pieceWidth; j++) {
      if (piece[i][j] !== ".") {
        board[row + i][col + j] = piece[i][j]
      }
    }
  }
}

const removePiece = (board, row, col, piece) => {
  const pieceWidth = piece[0].length
  const pieceHeight = piece.length

  for (let i = 0; i < pieceHeight; i++) {
    for (let j = 0; j < pieceWidth; j++) {
      if (piece[i][j] !== ".") {
        board[row + i][col + j] = "."
      }
    }
  }
}

const getUnusedPiece = (board) => {
  const usedLetters = new Set()
  for (let row of board) {
    for (let e of row) {
      usedLetters.add(e)
    }
  }
  return pieces.filter((e) => !usedLetters.has(e.id))
}

const savePiecePosition = (row, col, piece, usedPositions) => {
  const pieceHeight = piece.length
  const pieceWidth = piece[0].length

  for (let k = 0; k < pieceHeight; k++) {
    for (let l = 0; l < pieceWidth; l++) {
      if (piece[k][l] !== ".") {
        usedPositions.add(`${row + k},${col + l}`)
      }
    }
  }
}

const isPossibleCase = (board, unusedPiece) => {
  const usedPositions = new Set()

  for (let row = 0; row < boardHeight; row++) {
    for (let col = 0; col < boardWidth; col++) {
      if (board[row][col] === ".") {
        for (let i = 1; i < unusedPiece.length; i++) {
          const rotatedPiece = unusedPiece[i].orientation
          for (let j = 0; j < rotatedPiece.length; j++) {
            const piece = rotatedPiece[j]
            const pieceWidth = piece[0].length
            const pieceHeight = piece.length

            if (
              boardHeight - pieceHeight >= row &&
              boardWidth - pieceWidth >= col &&
              canPlace(board, row, col, piece)
            ) {
              savePiecePosition(row, col, piece, usedPositions)
              break
            }
          }
        }
        if (!usedPositions.has(`${row},${col}`)) return false
      }
    }
  }
  return true
}

const solveCalendarPuzzle = (board, steps = [], record = "", memo = {}) => {
  const unusedPiece = getUnusedPiece(board)
  if (unusedPiece.length === 0) {
    steps.push(JSON.stringify(board))
    return { steps, board }
  }

  const key = board.toString()
  if (key in memo) return memo[key]

  const piece = unusedPiece[0]
  const pieceOrientation = piece.orientation

  for (let i = 0; i < pieceOrientation.length; i++) {
    const currentPiece = pieceOrientation[i]
    const pieceWidth = currentPiece[0].length
    const pieceHeight = currentPiece.length

    for (let row = 0; row <= boardHeight - pieceHeight; row++) {
      for (let col = 0; col <= boardWidth - pieceWidth; col++) {
        if (canPlace(board, row, col, currentPiece)) {
          placePiece(board, row, col, currentPiece)
          steps.push(JSON.stringify(board))
          const isPossible = isPossibleCase(board, unusedPiece)
          if (!isPossible) {
            removePiece(board, row, col, currentPiece)
            continue
          }
          const updatedRecord = `${record}${i},${row},${col},${piece.id},${isPossible}:`

          const result = solveCalendarPuzzle(board, steps, updatedRecord, memo)
          if (result) {
            memo[key] = result
            return result
          }
          removePiece(board, row, col, currentPiece)
        }
      }
    }
  }

  memo[key] = null
  return null
}

export { board, solveCalendarPuzzle }
