import { useState } from 'react'
import AppHeader from '../components/AppHeader'

const Calculator = ({ onBack }) => {
    const [display, setDisplay] = useState('0')
    const [previousValue, setPreviousValue] = useState(null)
    const [operator, setOperator] = useState(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(digit)
            setWaitingForOperand(false)
        } else {
            setDisplay(display === '0' ? digit : display + digit)
        }
    }

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.')
            setWaitingForOperand(false)
            return
        }
        if (!display.includes('.')) {
            setDisplay(display + '.')
        }
    }

    const clear = () => {
        setDisplay('0')
        setPreviousValue(null)
        setOperator(null)
        setWaitingForOperand(false)
    }

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display)

        if (previousValue === null) {
            setPreviousValue(inputValue)
        } else if (operator) {
            const result = calculate(previousValue, inputValue, operator)
            setDisplay(String(result))
            setPreviousValue(result)
        }

        setWaitingForOperand(true)
        setOperator(nextOperator)
    }

    const calculate = (prev, next, op) => {
        switch (op) {
            case '+': return prev + next
            case '-': return prev - next
            case '×': return prev * next
            case '÷': return next !== 0 ? prev / next : 'Error'
            case '%': return prev % next
            default: return next
        }
    }

    const handleEquals = () => {
        if (!operator || previousValue === null) return

        const inputValue = parseFloat(display)
        const result = calculate(previousValue, inputValue, operator)

        setDisplay(String(result))
        setPreviousValue(null)
        setOperator(null)
        setWaitingForOperand(true)
    }

    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1))
    }

    const percentage = () => {
        setDisplay(String(parseFloat(display) / 100))
    }

    const buttons = [
        { label: 'C', action: clear, type: 'function' },
        { label: '±', action: toggleSign, type: 'function' },
        { label: '%', action: percentage, type: 'function' },
        { label: '÷', action: () => performOperation('÷'), type: 'operator' },
        { label: '7', action: () => inputDigit('7'), type: 'digit' },
        { label: '8', action: () => inputDigit('8'), type: 'digit' },
        { label: '9', action: () => inputDigit('9'), type: 'digit' },
        { label: '×', action: () => performOperation('×'), type: 'operator' },
        { label: '4', action: () => inputDigit('4'), type: 'digit' },
        { label: '5', action: () => inputDigit('5'), type: 'digit' },
        { label: '6', action: () => inputDigit('6'), type: 'digit' },
        { label: '-', action: () => performOperation('-'), type: 'operator' },
        { label: '1', action: () => inputDigit('1'), type: 'digit' },
        { label: '2', action: () => inputDigit('2'), type: 'digit' },
        { label: '3', action: () => inputDigit('3'), type: 'digit' },
        { label: '+', action: () => performOperation('+'), type: 'operator' },
        { label: '0', action: () => inputDigit('0'), type: 'digit', wide: true },
        { label: '.', action: inputDecimal, type: 'digit' },
        { label: '=', action: handleEquals, type: 'operator' },
    ]

    return (
        <div className="app-container calculator-app">
            <AppHeader title="Calculator" onBack={onBack} />
            <div className="calc-display">
                <div className="calc-value">{display}</div>
            </div>
            <div className="calc-buttons">
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        className={`calc-btn ${btn.type} ${btn.wide ? 'wide' : ''}`}
                        onClick={btn.action}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Calculator
