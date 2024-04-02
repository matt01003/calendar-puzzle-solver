import React from "react"
import "../App.css"
import { colors, boardContent } from "../calendar-puzzle-solver/config"

export default function Board({
  board,
  isLoading,
  disabled,
  selectedDate,
  updateSelectedDate,
}) {
  return (
    <div className="board-container">
      {isLoading && <div className="loading">Loading</div>}
      {board.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((cell, j) => {
              return (
                <div key={j} style={{ flex: 1, aspectRatio: "1/1" }}>
                  <div
                    className="cell-content"
                    onClick={() => {
                      if (disabled) return
                      updateSelectedDate(i, j)
                    }}
                    style={styles.cell(cell, board, i, j, selectedDate)}
                  >
                    {[".", "*"].includes(board[i][j]) && boardContent[i][j]}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const styles = {
  cell: (cell, board, i, j, selectedDate) => {
    return {
      backgroundColor: Object.values(selectedDate)
        .map((obj) => obj?.content)
        .includes(boardContent[i][j])
        ? colors["x"]
        : colors[cell],
      borderWidth: `${
        i === 0 || board[i - 1][j] !== cell || board[i - 1][j] === "." ? 0.5 : 0
      }px ${
        board[i][j + 1] !== cell || board[i][j + 1] === "." ? 0.5 : 0
      }px 0px 0px`,
    }
  },
}
