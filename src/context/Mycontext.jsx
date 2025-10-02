import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export let MyStore = createContext();

const API_KEY = "1813d552b91a4096ab954036250110";
const BASE_URL = "https://api.weatherapi.com/v1";

export const Mycontext = ({ children }) => {
    const [weather, setWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentCity, setCurrentCity] = useState('bhopal')

    // Fetch current weather data
    const fetchWeatherData = async (city = currentCity) => {
        setLoading(true)
        setError(null)
        try {
            const currentRes = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=yes`)
            const forecastRes = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`)
            
            setWeather(currentRes.data)
            setForecast(forecastRes.data)
            setCurrentCity(city)
            
        } catch (error) {
            console.error("API Error:", error)
            setError(error.response?.data?.error?.message || "Failed to fetch weather data")
        } finally {
            setLoading(false)
        }
    }

    // Search for a city
    const searchCity = async (cityName) => {
        if (!cityName.trim()) return
        await fetchWeatherData(cityName)
    }

    useEffect(() => {
        fetchWeatherData()
    }, [])

    const contextValue = {
        weather,
        forecast,
        loading,
        error,
        currentCity,
        searchCity,
        fetchWeatherData
    }

    return (
        <MyStore.Provider value={contextValue}>
            {children}
        </MyStore.Provider>
    )
}
