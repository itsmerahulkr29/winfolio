import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

const themeColors = {
    blue: { primary: '#0078d4', hover: '#106ebe', name: 'Blue' },
    green: { primary: '#107c10', hover: '#0e6b0e', name: 'Green' },
    orange: { primary: '#ff8c00', hover: '#e67e00', name: 'Orange' },
    purple: { primary: '#5c2d91', hover: '#4a2473', name: 'Purple' },
    red: { primary: '#e81123', hover: '#c50f1f', name: 'Red' },
    teal: { primary: '#008080', hover: '#006666', name: 'Teal' },
    pink: { primary: '#e3008c', hover: '#c4007a', name: 'Pink' },
    yellow: { primary: '#ffc83d', hover: '#e6b435', name: 'Yellow' }
}

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('winfolio-dark-mode')
        return saved ? JSON.parse(saved) : false // Light mode is default
    })

    const [accentColor, setAccentColor] = useState(() => {
        const saved = localStorage.getItem('winfolio-accent-color')
        return saved || 'blue'
    })

    const [timeFormat, setTimeFormat] = useState(() => {
        const saved = localStorage.getItem('winfolio-time-format')
        return saved || '24' // Default to 24h
    })

    useEffect(() => {
        localStorage.setItem('winfolio-dark-mode', JSON.stringify(isDarkMode))
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    useEffect(() => {
        localStorage.setItem('winfolio-accent-color', accentColor)
        const color = themeColors[accentColor]
        document.documentElement.style.setProperty('--accent-primary', color.primary)
        document.documentElement.style.setProperty('--accent-hover', color.hover)
    }, [accentColor])

    useEffect(() => {
        localStorage.setItem('winfolio-time-format', timeFormat)
    }, [timeFormat])

    const toggleDarkMode = () => setIsDarkMode(prev => !prev)

    return (
        <ThemeContext.Provider value={{
            isDarkMode,
            toggleDarkMode,
            accentColor,
            setAccentColor,
            themeColors,
            timeFormat,
            setTimeFormat
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
