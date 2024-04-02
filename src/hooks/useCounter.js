import { useEffect, useState } from "react"

export default function useCounter(solution) {
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (!solution) return

    const t = setInterval(() => {
      setCount(
        (prevCount) =>
          prevCount + (solution.length - prevCount > 1000 ? 300 : 1)
      )
    }, 10)

    setTimer(t)

    return () => clearInterval(t)
  }, [solution])

  useEffect(() => {
    if (!solution || count !== solution.length - 1) return
    clearInterval(timer)
  }, [solution, count, timer])

  const resetTimer = () => {
    setCount(0)
    setTimer(null)
  }

  return { count, resetTimer }
}
