import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import PhoneFrame from './components/PhoneFrame'
import Tile from './components/Tile'
import ClockApp from './apps/ClockApp'
import Calculator from './apps/Calculator'
import NotesApp from './apps/NotesApp'
import CallApp from './apps/CallApp'
import WeatherApp from './apps/WeatherApp'
import TicTacToe from './apps/TicTacToe'
import SettingsApp from './apps/SettingsApp'
import ProjectsApp from './apps/ProjectsApp'
import './index.css'

// Icons as SVG components
const Icons = {
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  ),
  Calculator: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm-8 8H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2z" />
    </svg>
  ),
  Notes: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z" />
    </svg>
  ),
  Call: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  ),
  Weather: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
    </svg>
  ),
  Game: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  ),
  Person: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  ),
  Work: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="42" height="42">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

// Clock Tile Component (for home screen)
const ClockTile = ({ onClick }) => {
  const { timeFormat } = useTheme()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: timeFormat === '12'
  })

  // Start wrapping formattedTime results for manual parsing if needed, 
  // but toLocaleTimeString returns "HH:MM AM/PM" or "HH:MM"
  // Let's just use the string directly or split if we want specific layout.
  // The original code split manually hours/minutes. 
  // Let's stick to the string for simplicity or parse it.

  // Actually, to match the layout (Hours:Minutes), let's rely on standard formatting
  // which might include AM/PM. The original design might have been digital.

  return (
    <div className="tile tile-wide tile-accent" onClick={onClick}>
      <div className="time-display">{formattedTime}</div>
      <div className="date-display">{time.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      })}</div>
    </div>
  )
}

// Home Screen Component
const HomeScreen = ({ onOpenApp }) => {
  return (
    <div className="tile-container">
      {/* Row 1: Clock (Live Tile) and Profile */}
      <ClockTile onClick={() => onOpenApp('clock')} />

      <Tile
        size="medium"
        color="accent"
        onClick={() => onOpenApp('call')}
      >
        <div className="profile-tile">
          <img src="profile.jpg" alt="Rahul Kumar" className="profile-image" />
          <div className="profile-info">
            <div className="profile-name">Rahul Kumar</div>
            <div className="profile-title">Full Stack Developer</div>
            <div className="profile-contact">B.Tech CSE</div>
          </div>
        </div>
      </Tile>

      {/* Row 2: Apps (Clock Small, Calculator) - Left of Profile */}
      <Tile size="small" color="blue" icon={Icons.Clock} title="Clock" onClick={() => onOpenApp('clock')} />
      <Tile size="small" color="accent" icon={Icons.Calculator} title="Calculator" onClick={() => onOpenApp('calculator')} />

      {/* Row 3: Notes, Weather, LinkedIn, GitHub */}
      <Tile size="small" color="green" icon={Icons.Notes} title="Notes" onClick={() => onOpenApp('notes')} />
      <Tile size="small" color="orange" icon={Icons.Weather} title="Weather" onClick={() => onOpenApp('weather')} />

      <Tile
        size="small"
        color="accent"
        icon={Icons.LinkedIn}
        title="LinkedIn"
        href="https://linkedin.com/in/rahul-kumar-901a01238"
      />
      <Tile
        size="small"
        color="dark"
        icon={Icons.GitHub}
        title="GitHub"
        href="https://github.com/itsmerahulkr29"
      />

      {/* Row 4: TicTacToe, Projects, Contact */}
      <Tile size="small" color="purple" icon={Icons.Game} title="Tic Tac Toe" onClick={() => onOpenApp('tictactoe')} />

      <Tile
        size="wide"
        color="teal"
        onClick={() => onOpenApp('projects')}
      >
        <div className="project-tile">
          <Icons.Code />
          <div className="tile-large-title" style={{ marginTop: '8px' }}>Projects</div>
        </div>
      </Tile>

      <Tile
        size="small"
        color="accent"
        icon={Icons.Call}
        title="Contact"
        onClick={() => onOpenApp('call')}
      />

      {/* Row 5: Settings */}
      <Tile
        size="small"
        color="dark"
        icon={Icons.Settings}
        title="Settings"
        onClick={() => onOpenApp('settings')}
      />
    </div>
  )
}

// Main App Component
function App() {
  const [currentApp, setCurrentApp] = useState(null)

  const openApp = (appName) => {
    setCurrentApp(appName)
  }

  const goBack = () => {
    setCurrentApp(null)
  }

  const goHome = () => {
    setCurrentApp(null)
  }

  const renderApp = () => {
    switch (currentApp) {
      case 'clock':
        return <ClockApp onBack={goBack} />
      case 'calculator':
        return <Calculator onBack={goBack} />
      case 'notes':
        return <NotesApp onBack={goBack} />
      case 'call':
        return <CallApp onBack={goBack} />
      case 'weather':
        return <WeatherApp onBack={goBack} />
      case 'tictactoe':
        return <TicTacToe onBack={goBack} />
      case 'settings':
        return <SettingsApp onBack={goBack} />
      case 'projects':
        return <ProjectsApp onBack={goBack} />
      default:
        return <HomeScreen onOpenApp={openApp} />
    }
  }

  return (
    <ThemeProvider>
      <PhoneFrame currentApp={currentApp} onBack={goBack} onHome={goHome}>
        {renderApp()}
      </PhoneFrame>
    </ThemeProvider>
  )
}

export default App
