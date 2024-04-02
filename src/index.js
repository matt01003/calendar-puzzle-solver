import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import workercode from "./calendar-puzzle-solver/worker"

// eslint-disable-next-line
if (self.Window) {
  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(<App />)

  reportWebVitals()
} else {
  workercode()
}
