import { type TCell } from "../lib/definitions"

type CellProps = {
  cell: TCell
  handleClick: () => void
}

export const Cell = ({ cell, handleClick }: CellProps) => {
  if (cell.value === 0) {
    return <div className="size-16"></div>
  }

  const visibleStyle = "flex items-center justify-center text-4xl text-white select-none font-semibold"
  const correctStyle = "border-white/20 hover:border-white/40 border-4"
  const wrongStyle = "bg-red-400 hover:bg-red-500"

  return (
    <div 
      className={`${cell.visible ? `${visibleStyle} ${cell.wrong ? wrongStyle : correctStyle}` : "bg-blue-100"} size-16 p-4 rounded-xl cursor-pointer`}
      onClick={handleClick}
    >
      {cell.visible && cell.value}
    </div>
  )
}
