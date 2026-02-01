import { useState, useEffect, useCallback } from 'react'
import AppHeader from '../components/AppHeader'

const WeatherApp = ({ onBack }) => {
    const [weather, setWeather] = useState({
        location: 'New York, USA',
        temp: 20,
        condition: 'Sunny',
        weatherCode: 0,
        humidity: 60,
        wind: 10,
        forecast: []
    })
    const [isSearching, setIsSearching] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)

    // Initial load
    useEffect(() => {
        fetchWeather(25.59, 85.13, 'Patna, India') // Default to Patna
    }, [])

    const debounce = (func, wait) => {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => func(...args), wait)
        }
    }

    const fetchSuggestions = async (query) => {
        if (!query || query.length < 3) {
            setSuggestions([])
            return
        }

        try {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`)
            const data = await res.json()
            if (data.results) {
                setSuggestions(data.results)
            } else {
                setSuggestions([])
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error)
        }
    }

    // Debounced search function
    const debouncedFetchSuggestions = useCallback(debounce((q) => fetchSuggestions(q), 500), [])

    const handleSearchChange = (e) => {
        const query = e.target.value
        setSearchQuery(query)
        debouncedFetchSuggestions(query)
    }

    const getWeatherIcon = (code) => {
        if (code === 0) return '☀️'
        if (code >= 1 && code <= 3) return '⛅'
        if (code >= 45 && code <= 48) return '☁️'
        if (code >= 51 && code <= 67) return '🌧️'
        if (code >= 71 && code <= 77) return '❄️'
        if (code >= 80 && code <= 82) return '🌦️'
        if (code >= 95 && code <= 99) return '⛈️'
        return '☀️'
    }

    const getConditionText = (code) => {
        if (code === 0) return 'Sunny'
        if (code >= 1 && code <= 3) return 'Partly Cloudy'
        if (code >= 45 && code <= 48) return 'Foggy'
        if (code >= 51 && code <= 67) return 'Rainy'
        if (code >= 71 && code <= 77) return 'Snowy'
        if (code >= 80 && code <= 82) return 'Showers'
        if (code >= 95 && code <= 99) return 'Thunderstorm'
        return 'Unknown'
    }

    const fetchWeather = async (lat, lon, name) => {
        setLoading(true)
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`)
            const data = await res.json()

            const current = data.current
            const daily = data.daily

            const forecast = daily.time.slice(1, 6).map((date, index) => { // Next 5 days
                const d = new Date(date)
                const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
                return {
                    day: dayName,
                    temp: Math.round((daily.temperature_2m_max[index + 1] + daily.temperature_2m_min[index + 1]) / 2),
                    icon: getWeatherIcon(daily.weather_code[index + 1])
                }
            })

            setWeather({
                location: name,
                temp: Math.round(current.temperature_2m),
                condition: getConditionText(current.weather_code),
                weatherCode: current.weather_code,
                humidity: current.relative_humidity_2m,
                wind: Math.round(current.wind_speed_10m),
                forecast: forecast
            })
            setIsSearching(false)
            setSearchQuery('')
            setSuggestions([])
        } catch (error) {
            console.error("Error fetching weather:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSelectLocation = (place) => {
        const name = `${place.name}, ${place.country_code}`
        fetchWeather(place.latitude, place.longitude, name)
    }

    return (
        <div className="app-container weather-app">
            <AppHeader
                title={isSearching ? "Search Location" : "Weather"}
                onBack={isSearching ? () => setIsSearching(false) : onBack}
                actions={!isSearching && (
                    <button className="icon-btn" onClick={() => setIsSearching(true)}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </button>
                )}
            />

            {isSearching ? (
                <div className="search-overlay">
                    <input
                        type="text"
                        placeholder="Search city..."
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        autoFocus
                    />
                    <div className="suggestions-list">
                        {suggestions.map(place => (
                            <div key={place.id} className="suggestion-item" onClick={() => handleSelectLocation(place)}>
                                <span className="suggestion-name">{place.name}</span>
                                <span className="suggestion-sub">{place.admin1 ? `${place.admin1}, ` : ''}{place.country}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {loading ? (
                        <div className="loading-state">Loading...</div>
                    ) : (
                        <>
                            <div className="app-content weather-content">
                                <div className="weather-header">
                                    <div className="weather-location">{weather.location}</div>
                                    <div className="weather-main">
                                        <div className="weather-icon-large">{getWeatherIcon(weather.weatherCode ?? 0)}</div>
                                        <div className="weather-temp">{weather.temp}°</div>
                                    </div>
                                    <div className="weather-condition">{weather.condition}</div>
                                </div>

                                <div className="weather-details">
                                    <div className="weather-detail">
                                        <span className="detail-icon">💧</span>
                                        <span className="detail-label">Humidity</span>
                                        <span className="detail-value">{weather.humidity}%</span>
                                    </div>
                                    <div className="weather-detail">
                                        <span className="detail-icon">💨</span>
                                        <span className="detail-label">Wind</span>
                                        <span className="detail-value">{weather.wind} km/h</span>
                                    </div>
                                </div>

                                <div className="weather-forecast">
                                    <h3>5-Day Forecast</h3>
                                    <div className="forecast-list">
                                        {weather.forecast.map((day, index) => (
                                            <div key={index} className="forecast-item">
                                                <div className="forecast-day">{day.day}</div>
                                                <div className="forecast-icon">{day.icon}</div>
                                                <div className="forecast-temp">{day.temp}°</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default WeatherApp
