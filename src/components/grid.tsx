import { type TCell } from "../lib/definitions"
import { Cell } from "./cell"

type GridProps = {
  cells: TCell[]
  handleCellClick: (id: number) => void
  hasStarted: boolean
}

export const Grid = ({ cells, handleCellClick, hasStarted }: GridProps) => {
  return (
    <div className="grid grid-cols-8 gap-2">
      {cells.map(cell => (
        <Cell 
          cell={{...cell, visible: !hasStarted}} 
          handleClick={() => handleCellClick(cell.id)}
          key={cell.id} 
        />
      ))}
    </div>
  )
}
