"use client"

interface SquareProps {
  value: string | null
  isWinningSquare: boolean
  onSquareClick: () => void
}

export default function Square({ value, isWinningSquare, onSquareClick }: SquareProps) {
  return (
    <button
      className={`h-24 w-full text-4xl font-bold flex items-center justify-center rounded-md transition-all duration-200 ${
        isWinningSquare
          ? "bg-green-500/20 border-2 border-green-500 text-green-400"
          : value
            ? "bg-slate-700 border border-slate-600 hover:bg-slate-600 " +
              (value === "X" ? "text-blue-400" : "text-red-400")
            : "bg-slate-700 border border-slate-600 hover:bg-slate-600 text-white"
      }`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

