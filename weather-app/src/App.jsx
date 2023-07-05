/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './App.css'

const API_KEY = '2706c4b69902ed240281a46c67f163d2'

const WeatherApp = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        
        if (response.ok) {
          const data = await response.json()
          setWeatherData(data)
        } else {
          console.error('Unable to fetch weather data')
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    if (city) {
      fetchWeatherData()
    }
  }, [city])

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  return (
    <div>
      <h1>Check Weather</h1>
      <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city name" />

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  )
}

export default WeatherApp