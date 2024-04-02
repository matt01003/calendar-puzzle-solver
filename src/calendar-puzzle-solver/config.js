const colors = {
  a: "#e60000",
  b: "#00e600",
  c: "#0000e6",
  d: "#e5e500",
  e: "#e500e5",
  f: "#00e6e6",
  g: "#ffae19",
  h: "#8c198c",
  i: "#007300",
  j: "#FFC0CB",
  ".": "white",
  "*": "white",
  x: "#CCCCCC",
}

const boardContent = [
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", null],
  ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", null],
  ["1", "2", "3", "4", "5", "6", "7"],
  ["8", "9", "10", "11", "12", "13", "14"],
  ["15", "16", "17", "18", "19", "20", "21"],
  ["22", "23", "24", "25", "26", "27", "28"],
  ["29", "30", "31", "Sun", "Mon", "Tue", "Wed"],
  [null, null, null, null, "Thu", "Fri", "Sat"],
]

const defaultBoard = [
  [".", ".", ".", ".", ".", ".", "x"],
  [".", ".", ".", ".", ".", ".", "x"],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  ["x", "x", "x", "x", ".", ".", "."],
]

export { colors, boardContent, defaultBoard }
