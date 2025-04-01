import Square from "./square"

interface BoardProps {
  squares: Array<string | null>
  winningSquares: number[] | null
  xIsNext: boolean
  onPlay: (squares: Array<string | null>) => void
}

export default function Board({ squares, winningSquares, xIsNext, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? "X" : "O"
    onPlay(nextSquares)
  }

  function calculateWinner(squares: Array<string | null>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: lines[i] }
      }
    }
    return null
  }

  return (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          isWinningSquare={winningSquares?.includes(index) || false}
          onSquareClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}

