import { useState, useEffect, useRef } from 'react'
import AppHeader from '../components/AppHeader'
import { useTheme } from '../context/ThemeContext'

const ClockApp = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('clock')

    return (
        <div className="app-container clock-app">
            <AppHeader title="Clock" onBack={onBack} />

            <div className="tab-bar">
                <button
                    className={`tab ${activeTab === 'clock' ? 'active' : ''}`}
                    onClick={() => setActiveTab('clock')}
                >
                    Clock
                </button>
                <button
                    className={`tab ${activeTab === 'alarm' ? 'active' : ''}`}
                    onClick={() => setActiveTab('alarm')}
                >
                    Alarm
                </button>
                <button
                    className={`tab ${activeTab === 'stopwatch' ? 'active' : ''}`}
                    onClick={() => setActiveTab('stopwatch')}
                >
                    Stopwatch
                </button>
                <button
                    className={`tab ${activeTab === 'timer' ? 'active' : ''}`}
                    onClick={() => setActiveTab('timer')}
                >
                    Timer
                </button>
            </div>

            <div className="app-content">
                {activeTab === 'clock' && <WorldClock />}
                {activeTab === 'alarm' && <Alarm />}
                {activeTab === 'stopwatch' && <Stopwatch />}
                {activeTab === 'timer' && <Timer />}
            </div>
        </div>
    )
}

const WorldClock = () => {
    const { timeFormat } = useTheme()
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const cities = [
        { name: 'Local', offset: 0 },
        { name: 'New York', offset: -5 },
        { name: 'London', offset: 0 },
        { name: 'Tokyo', offset: 9 },
    ]

    const getTimeForCity = (offset) => {
        const utc = time.getTime() + (time.getTimezoneOffset() * 60000)
        const cityTime = new Date(utc + (3600000 * offset))
        return cityTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: timeFormat === '12'
        })
    }

    return (
        <div className="world-clock">
            <div className="main-time">
                <div className="time-display-large">
                    {time.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: timeFormat === '12'
                    })}
                </div>
                <div className="date-display-large">
                    {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>
            <div className="city-list">
                {cities.map(city => (
                    <div key={city.name} className="city-item">
                        <span className="city-name">{city.name}</span>
                        <span className="city-time">{city.name === 'Local' ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: timeFormat === '12' }) : getTimeForCity(city.offset)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Alarm = () => {
    const [alarms, setAlarms] = useState([
        { id: 1, time: '06:00', enabled: true, label: 'Wake up' },
        { id: 2, time: '08:30', enabled: false, label: 'Meeting' },
    ])

    const toggleAlarm = (id) => {
        setAlarms(alarms.map(alarm =>
            alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
        ))
    }

    return (
        <div className="alarm-list">
            {alarms.map(alarm => (
                <div key={alarm.id} className={`alarm-item ${alarm.enabled ? 'enabled' : ''}`}>
                    <div className="alarm-info">
                        <div className="alarm-time">{alarm.time}</div>
                        <div className="alarm-label">{alarm.label}</div>
                    </div>
                    <button
                        className={`toggle-switch ${alarm.enabled ? 'on' : 'off'}`}
                        onClick={() => toggleAlarm(alarm.id)}
                    >
                        <div className="toggle-knob"></div>
                    </button>
                </div>
            ))}
            <button className="add-alarm-btn">+ Add Alarm</button>
        </div>
    )
}

const Stopwatch = () => {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState([])
    const intervalRef = useRef(null)

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 10)
            }, 10)
        } else {
            clearInterval(intervalRef.current)
        }
        return () => clearInterval(intervalRef.current)
    }, [isRunning])

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        const centiseconds = Math.floor((ms % 1000) / 10)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
    }

    const handleLap = () => {
        setLaps([...laps, time])
    }

    const handleReset = () => {
        setIsRunning(false)
        setTime(0)
        setLaps([])
    }

    return (
        <div className="stopwatch">
            <div className="stopwatch-display">{formatTime(time)}</div>
            <div className="stopwatch-controls">
                <button className="control-btn" onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button className="control-btn" onClick={handleLap} disabled={!isRunning}>
                    Lap
                </button>
                <button className="control-btn" onClick={handleReset}>
                    Reset
                </button>
            </div>
            {laps.length > 0 && (
                <div className="lap-list">
                    {laps.map((lap, index) => (
                        <div key={index} className="lap-item">
                            <span>Lap {index + 1}</span>
                            <span>{formatTime(lap)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const Timer = () => {
    const [totalSeconds, setTotalSeconds] = useState(300)
    const [remainingSeconds, setRemainingSeconds] = useState(300)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null)

    useEffect(() => {
        if (isRunning && remainingSeconds > 0) {
            intervalRef.current = setInterval(() => {
                setRemainingSeconds(prev => prev - 1)
            }, 1000)
        } else {
            clearInterval(intervalRef.current)
        }
        return () => clearInterval(intervalRef.current)
    }, [isRunning, remainingSeconds])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const presets = [60, 180, 300, 600, 900]

    return (
        <div className="timer">
            <div className="timer-display">{formatTime(remainingSeconds)}</div>
            <div className="timer-presets">
                {presets.map(preset => (
                    <button
                        key={preset}
                        className="preset-btn"
                        onClick={() => { setTotalSeconds(preset); setRemainingSeconds(preset); setIsRunning(false) }}
                    >
                        {preset >= 60 ? `${preset / 60}m` : `${preset}s`}
                    </button>
                ))}
            </div>
            <div className="timer-controls">
                <button className="control-btn" onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button className="control-btn" onClick={() => { setRemainingSeconds(totalSeconds); setIsRunning(false) }}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default ClockApp
