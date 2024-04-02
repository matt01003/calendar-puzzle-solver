import { solveCalendarPuzzle } from "./calendar-puzzle-solver"

const workercode = () => {
  onmessage = (e) => {
    const { updatedBoard } = e.data
    const solution = solveCalendarPuzzle(updatedBoard)
    postMessage({ solution: solution.steps.map((e) => JSON.parse(e)) })
  }
}

export default workercode
