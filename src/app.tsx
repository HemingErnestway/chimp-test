import { useEffect, useState } from "react"
import { type TCell } from "./lib/definitions"
import { generateLevel } from "./lib/functions"
import { Grid } from "./components/grid"

export const App = () => {
  const [currentLevel, setCurrentLevel] = useState(4)
  const [score, setScore] = useState(4)
  const [cells, setCells] = useState<TCell[]>(generateLevel(currentLevel))
  const [hasStarted, setHasStarted] = useState(false)
  const [expected, setExpected] = useState(1)
  const [strikes, setStrikes] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWrong, setIsWrong] = useState(false)

  useEffect(() => {
    setCells(generateLevel(currentLevel))
  }, [currentLevel])

  const handleGameOver = () => {
    setCurrentLevel(4)
    setCells(generateLevel(currentLevel))
    setScore(0)
    setHasStarted(false)
    setExpected(1)
    setStrikes(0)
    setIsGameOver(false)
  }

  const handleWrong = () => {
    setCells(generateLevel(currentLevel))
    setExpected(1)
    setIsWrong(false)
  }

  const handleCellClick = (id: number) => {
    // restart game on game over
    if (isGameOver) {
      handleGameOver()
      return
    }
    // restart level if wrong 
    if (isWrong) {
      handleWrong()
      return 
    }
    // happy path
    if (cells[id].value === expected) {
      // first cell
      if (cells[id].value === 1 && currentLevel !== 4) {
        setHasStarted(true)  
      }
      // next
      if (expected === currentLevel) {
        // next level
        // TODO: handle level 40
        setCurrentLevel(currentLevel + 1)
        setScore(score + 1) 
        setHasStarted(false)
        setExpected(1)
      } else {
        // next cell
        setExpected(expected + 1)
      }
      // set clicked
      const oldCells = [...cells]
      oldCells[id].value = 0
      setCells(oldCells)    
    } else {
      // strike path
      // set wrong
      setIsWrong(true)

      const oldCells = [...cells]
      oldCells[id].wrong = true
      setCells(oldCells)  

      setHasStarted(false)

      if (strikes === 2) {
        setIsGameOver(true)
      } 

      setStrikes(strikes + 1)
    }
  }

  const handleGridClick = () => {
    if (isGameOver) {
      handleGameOver()
      return
    }
    if (isWrong) {
      handleWrong()
    }
  }

  return (
    <div className="h-screen bg-[#e6e8f4]">
      <div 
        className={`${isWrong || isGameOver ? "cursor-pointer" : ""} bg-[#2b87d1] py-16 flex justify-center`}
        onClick={handleGridClick}
      >
        <Grid 
          cells={cells} 
          handleCellClick={handleCellClick} 
          hasStarted={hasStarted} 
        />
      </div>
      <div className="flex justify-center">
        <div className="w-[568px] h-[80px] justify-between items-center flex text-slate-600 text-2xl font-semibold">
          <p>
            Numbers <span className="bg-slate-300 text-slate-700 py-1 px-2 rounded-lg font-mono">{currentLevel}</span>
          </p>
          {isGameOver && (
            <button
              className="bg-[#2b87d1] text-white hover:bg-[#20669e] font-normal py-2 px-4 rounded-xl" 
              onClick={handleGameOver}
            >
              Try again
            </button>
          )}
          <p>
            Strikes <span className={`${isGameOver ? "bg-red-400 text-white" : "bg-slate-300 text-slate-600"} py-1 px-2 rounded-lg font-mono`}>
              {strikes}/3
            </span>
          </p>
        </div>
      </div>
      <br />
      <div className="flex justify-center">
        <div className="w-[568px] flex flex-col gap-4 text-lg">
          <h1 className="text-slate-700 text-3xl font-mono font-semibold">
            Chimpanzee Test
          </h1>
          <p>
            This is a test of working memory, made famous by a study that found that chimpanzees consistently outperform humans on this task.
          </p>
          <p>
            In the study, the chimps consistently outperformed humans, and some chimps were able to remember 9 digits over 90% of the time.
          </p>
          <p>
            This test is a variant of that concept, that gets increasingly difficult every turn, starting at 4 digits, and adding one every turn. If you pass a level, the number increases. If you fail, you get a strike. Three strikes and the test is over.
          </p>
          <p>
            <a 
              className="text-[#20669e] underline font-semibold"
              href="https://youtu.be/ravykEih1rE"
            >
              YouTube: Chimpanzee Doing Memory Test
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
