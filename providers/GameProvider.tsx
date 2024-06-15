import { createContext, useContext, useMemo } from "react"
import useGameData from "../hooks/useGameData"

const GameContext = createContext(null)

const GameProvider = ({ children }) => {
  const gameData = useGameData()

  const value = useMemo(
    () => ({
      ...gameData,
    }),
    [gameData],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within an GameProvider")
  }
  return context
}

export default GameProvider
