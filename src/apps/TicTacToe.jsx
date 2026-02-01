import { useState } from 'react'
import AppHeader from '../components/AppHeader'

const TicTacToe = ({ onBack }) => {
    // ... logic ...

    // Safety check with context match
    const [board, setBoard] = useState(Array(9).fill(null))
    const [isXNext, setIsXNext] = useState(true)
    const [score, setScore] = useState({ x: 0, o: 0, draws: 0 })

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: [a, b, c] }
            }
        }
        return null
    }

    const minimax = (squares, isMaximizing) => {
        const result = calculateWinner(squares)
        if (result?.winner === 'O') return 10
        if (result?.winner === 'X') return -10
        if (squares.every(s => s !== null)) return 0

        if (isMaximizing) {
            let bestScore = -Infinity
            for (let i = 0; i < 9; i++) {
                if (!squares[i]) {
                    squares[i] = 'O'
                    bestScore = Math.max(bestScore, minimax(squares, false))
                    squares[i] = null
                }
            }
            return bestScore
        } else {
            let bestScore = Infinity
            for (let i = 0; i < 9; i++) {
                if (!squares[i]) {
                    squares[i] = 'X'
                    bestScore = Math.min(bestScore, minimax(squares, true))
                    squares[i] = null
                }
            }
            return bestScore
        }
    }

    const getBestMove = (squares) => {
        let bestScore = -Infinity
        let bestMove = null
        for (let i = 0; i < 9; i++) {
            if (!squares[i]) {
                squares[i] = 'O'
                const score = minimax(squares, false)
                squares[i] = null
                if (score > bestScore) {
                    bestScore = score
                    bestMove = i
                }
            }
        }
        return bestMove
    }

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board) || !isXNext) return

        const newBoard = [...board]
        newBoard[index] = 'X'
        setBoard(newBoard)
        setIsXNext(false)

        // AI move
        setTimeout(() => {
            const result = calculateWinner(newBoard)
            if (!result && newBoard.some(s => s === null)) {
                const aiMove = getBestMove([...newBoard])
                if (aiMove !== null) {
                    newBoard[aiMove] = 'O'
                    setBoard([...newBoard])
                }
            }
            setIsXNext(true)
        }, 500)
    }

    const resetGame = () => {
        const result = calculateWinner(board)
        if (result) {
            setScore(prev => ({
                ...prev,
                [result.winner.toLowerCase()]: prev[result.winner.toLowerCase()] + 1
            }))
        } else if (board.every(s => s !== null)) {
            setScore(prev => ({ ...prev, draws: prev.draws + 1 }))
        }
        setBoard(Array(9).fill(null))
        setIsXNext(true)
    }

    const result = calculateWinner(board)
    const isDraw = !result && board.every(s => s !== null)

    const getStatus = () => {
        if (result) return `Winner: ${result.winner}`
        if (isDraw) return "It's a Draw!"
        return isXNext ? 'Your turn (X)' : 'AI thinking...'
    }

    return (
        <div className="app-container tictactoe-app">
            <AppHeader title="Tic Tac Toe" onBack={onBack} />

            <div className="game-score">
                <div className="score-item">
                    <span className="score-label">You (X)</span>
                    <span className="score-value">{score.x}</span>
                </div>
                <div className="score-item">
                    <span className="score-label">Draws</span>
                    <span className="score-value">{score.draws}</span>
                </div>
                <div className="score-item">
                    <span className="score-label">AI (O)</span>
                    <span className="score-value">{score.o}</span>
                </div>
            </div>

            <div className="game-status">{getStatus()}</div>

            <div className="game-board">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className={`board-cell ${cell ? 'filled' : ''} ${result?.line?.includes(index) ? 'winning' : ''}`}
                        onClick={() => handleClick(index)}
                        disabled={!!cell || !!result || !isXNext}
                    >
                        {cell}
                    </button>
                ))}
            </div>

            {(result || isDraw) && (
                <button className="play-again-btn" onClick={resetGame}>
                    Play Again
                </button>
            )}
        </div>
    )
}

export default TicTacToe
