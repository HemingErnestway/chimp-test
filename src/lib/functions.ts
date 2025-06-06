import { TCell } from "./definitions" 

function shuffle(arr: any[]) {
  for (let currIdx = arr.length; currIdx != 0; ) {
    const randIdx = Math.floor(Math.random() * currIdx)
    currIdx--
    [arr[currIdx], arr[randIdx]] = [arr[randIdx], arr[currIdx]]
  }
}

export function generateLevel(cellsNumber: number): TCell[] {
  const numbers = Array.from({ length: cellsNumber }, (_, i) => i + 1)
  const zeroes = Array(40 - cellsNumber).fill(0)

  const values = [...numbers, ...zeroes]
  shuffle(values)

  return values.map((value, i) => ({ 
    id: i, 
    value: value, 
    visible: true,
    wrong: false,
  }))
}
