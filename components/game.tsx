"use client"

import { useState, useEffect } from "react"
import Board from "./board"
import { calculateWinner } from "@/lib/game-utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RefreshCcw } from "lucide-react"

export default function Game() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState<number>(0)
  const [winningSquares, setWinningSquares] = useState<number[] | null>(null)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  useEffect(() => {
    const winner = calculateWinner(currentSquares)
    if (winner) {
      setWinningSquares(winner.line)
    } else {
      setWinningSquares(null)
    }
  }, [currentSquares])

  function handlePlay(nextSquares: Array<string | null>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function resetGame() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setWinningSquares(null)
  }

  const winner = calculateWinner(currentSquares)
  let status

  if (winner) {
    status = `Winner: ${winner.player}`
  } else if (currentSquares.every((square) => square !== null)) {
    status = "Game ended in a draw!"
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-xl">
      <CardContent className="pt-6">
        <div className="mb-4 text-center">
          <div
            className={`text-xl font-bold ${
              winner
                ? "text-green-400"
                : currentSquares.every((square) => square !== null)
                  ? "text-yellow-400"
                  : "text-white"
            }`}
          >
            {status}
          </div>
        </div>
        <Board squares={currentSquares} winningSquares={winningSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </CardContent>
      <CardFooter className="flex justify-center border-t border-slate-700 bg-slate-800/50 p-4">
        <Button
          onClick={resetGame}
          variant="outline"
          className="border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Restart Game
        </Button>
      </CardFooter>
    </Card>
  )
}

