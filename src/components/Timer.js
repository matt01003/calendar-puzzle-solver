import React, { useEffect, useState } from "react"

export default function Timer() {
  const [timer, setTimer] = useState(new Date())
  useEffect(() => {
    setInterval(() => {
      setTimer(new Date())
    }, 500)
  }, [])
  return <div>{timer.toString()}</div>
}
