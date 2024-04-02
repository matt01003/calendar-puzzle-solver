import { useEffect, useState } from "react"
import { defaultBoard, boardContent } from "./calendar-puzzle-solver/config"
import Board from "./components/Board"
import useCounter from "./hooks/useCounter"
import "./App.css"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [solution, setSolution] = useState(null)
  const [selectedDate, setSelectedDate] = useState({
    day: null,
    month: null,
    weekday: null,
  })
  const [worker, setWorker] = useState(null)
  const { count, resetTimer } = useCounter(solution)

  const updateSelectedDate = (i, j) => {
    const content = boardContent[i][j]
    const index = i * 7 + j
    if (index <= 13) {
      setSelectedDate({ ...selectedDate, month: { row: i, col: j, content } })
    } else if (index <= 44) {
      setSelectedDate({ ...selectedDate, day: { row: i, col: j, content } })
    } else {
      setSelectedDate({ ...selectedDate, weekday: { row: i, col: j, content } })
    }
  }

  useEffect(() => {
    const myWorker = new Worker(
      document.querySelector("script").getAttribute("src")
    )
    myWorker.onmessage = (e) => {
      const { solution } = e.data
      setSolution(solution)
      setIsLoading(false)
    }
    myWorker.onerror = (e) => {
      console.error(e)
    }
    setWorker(myWorker)
    return () => myWorker.terminate()
  }, [])

  const solve = () => {
    setIsLoading(true)
    const updatedBoard = JSON.parse(JSON.stringify(defaultBoard))
    Object.values(selectedDate).map((e) => (updatedBoard[e.row][e.col] = "*"))
    if (worker) worker.postMessage({ updatedBoard })
  }

  const reset = () => {
    setSelectedDate({ day: null, month: null, weekday: null })
    setSolution(null)
    resetTimer()
  }

  return (
    <div className="content">
      <div className="header">Calendar puzzle solver</div>
      <Board
        board={solution ? solution[count] : defaultBoard}
        isLoading={isLoading}
        disabled={!!solution}
        selectedDate={selectedDate}
        updateSelectedDate={updateSelectedDate}
      />
      <div className="details">
        {!solution ? (
          <button
            disabled={Object.values(selectedDate).some((e) => !e)}
            className="button"
            onClick={() => solve()}
          >
            Solve
          </button>
        ) : (
          <>
            <div>
              Step {count + 1} / {solution.length}
            </div>
            <button className="button" onClick={() => reset()}>
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
