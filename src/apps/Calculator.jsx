import { useState } from 'react'
import AppHeader from '../components/AppHeader'

const Calculator = ({ onBack }) => {
    const [display, setDisplay] = useState('0')

    const inputDigit = (digit) => {
        if (display === '0') {
            setDisplay(digit)
        } else {
            setDisplay(display + digit)
        }
    }

    const inputDecimal = () => {
        const parts = display.split(' ')
        const current = parts[parts.length - 1]
        if (!current.includes('.')) {
            setDisplay(display + '.')
        }
    }

    const clear = () => {
        setDisplay('0')
    }

    const performOperation = (op) => {
        // Add operator with spaces
        // If last char is operator (with spaces), replace it? 
        // Logic: if ending with space, we might be waiting.
        // Let's simplified: append.
        // check if trailing operator
        if (display.endsWith(' ')) {
            // replace op
            const newDisp = display.trimEnd().slice(0, -1) + ` ${op} `
            setDisplay(newDisp)
        } else {
            setDisplay(display + ` ${op} `)
        }
    }

    const calculate = () => {
        try {
            // Replace visual operators with JS operators
            let expression = display.replace(/×/g, '*').replace(/÷/g, '/')
            // Sanitize: allow only numbers, operators, dots, spaces, parens
            if (/[^0-9+\-*/().\s%]/.test(expression)) return

            // Eval is safe here due to strict input control from buttons
            // eslint-disable-next-line no-new-func
            const result = new Function('return ' + expression)()

            // Format result
            const formatted = String(Math.round(result * 1000000) / 1000000)
            setDisplay(formatted)
        } catch (e) {
            setDisplay('Error')
        }
    }

    const toggleSign = () => {
        // Find last number
        // This is complex with expression view.
        // Let's just wrap current display in -1 * (...) 
        // Or simplified: Just clear/error? 
        // User asked for "toggle sign".
        // Let's try to find the last operand.
        // Splits by space.
        const parts = display.split(' ')
        if (parts.length > 0) {
            const last = parts.pop()
            if (!isNaN(last)) {
                const toggled = String(parseFloat(last) * -1)
                setDisplay([...parts, toggled].join(' '))
            }
        }
    }

    const percentage = () => {
        const parts = display.split(' ')
        if (parts.length > 0) {
            const last = parts.pop()
            if (!isNaN(last)) {
                const percent = String(parseFloat(last) / 100)
                setDisplay([...parts, percent].join(' '))
            }
        }
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
        { label: '=', action: calculate, type: 'operator' },
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
