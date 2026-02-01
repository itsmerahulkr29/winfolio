import { useTheme } from '../context/ThemeContext'
import AppHeader from '../components/AppHeader'

const SettingsApp = ({ onBack }) => {
    const {
        isDarkMode,
        toggleDarkMode,
        accentColor,
        setAccentColor,
        themeColors,
        timeFormat,
        setTimeFormat
    } = useTheme()

    const toggleTimeFormat = () => {
        setTimeFormat(prev => prev === '24' ? '12' : '24')
    }

    return (
        <div className="app-container settings-app">
            <AppHeader title="Settings" onBack={onBack} />

            <div className="settings-section">
                <h2 className="section-title">Date & Time</h2>
                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">24-hour Clock</div>
                        <div className="setting-description">
                            {timeFormat === '24' ? '24-hour format' : '12-hour format'}
                        </div>
                    </div>
                    <button
                        className={`toggle-switch ${timeFormat === '24' ? 'on' : 'off'}`}
                        onClick={toggleTimeFormat}
                    >
                        <div className="toggle-knob"></div>
                    </button>
                </div>
            </div>

            <div className="settings-section">
                <h2 className="section-title">Appearance</h2>
                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">Dark Mode</div>
                        <div className="setting-description">
                            {isDarkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
                        </div>
                    </div>
                    <button
                        className={`toggle-switch ${isDarkMode ? 'on' : 'off'}`}
                        onClick={toggleDarkMode}
                    >
                        <div className="toggle-knob"></div>
                    </button>
                </div>
            </div>

            <div className="settings-section">
                <h2 className="section-title">Accent Color</h2>
                <div className="color-grid">
                    {Object.entries(themeColors).map(([key, color]) => (
                        <button
                            key={key}
                            className={`color-option ${accentColor === key ? 'selected' : ''}`}
                            style={{ backgroundColor: color.primary }}
                            onClick={() => setAccentColor(key)}
                        >
                            {accentColor === key && (
                                <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="settings-section">
                <h2 className="section-title">About</h2>
                <div className="about-info">
                    <div className="about-item">
                        <span className="about-label">App Name</span>
                        <span className="about-value">WinFolio</span>
                    </div>
                    <div className="about-item">
                        <span className="about-label">Version</span>
                        <span className="about-value">2.0.0</span>
                    </div>
                    <div className="about-item">
                        <span className="about-label">Developer</span>
                        <span className="about-value">Rahul Kumar</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsApp
