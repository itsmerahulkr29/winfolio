import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const PhoneFrame = ({ children, currentApp, onBack, onHome }) => {
    const { isDarkMode, timeFormat } = useTheme()
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: timeFormat === '12'
        })
    }

    return (
        <div className="phone-wrapper">
            <div className={`phone-frame ${isDarkMode ? 'dark' : 'light'}`}>
                {/* Camera Punch Hole */}
                <div className="camera-hole"></div>

                {/* Screen Content with Status Bar Inside */}
                <div className="phone-screen">
                    {/* Status Bar - Inside Screen */}
                    <div className="status-bar">
                        <div className="status-left">
                            <span className="status-time">{formatTime(time)}</span>
                        </div>
                        <div className="status-right">
                            <span className="signal-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                                    <path d="M2 22h4V12H2v10zm6 0h4V8H8v14zm6 0h4V2h-4v20z" />
                                </svg>
                            </span>
                            <span className="wifi-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                                </svg>
                            </span>
                            <span className="battery-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* App Content */}
                    <div className="screen-content">
                        {children}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default PhoneFrame
