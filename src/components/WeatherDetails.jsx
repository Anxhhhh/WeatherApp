import React, { useContext } from 'react';
import { MyStore } from '../context/Mycontext';

const WeatherDetails = () => {
  const { weather, loading } = useContext(MyStore);

  if (loading || !weather) {
    return (
      <div className="md:col-span-1 p-4 rounded-lg" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="lg:col-span-1 p-3 sm:p-4 rounded-lg" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h2 className="font-semibold text-base sm:text-lg mb-2">MORE DETAILS:</h2>
      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
        <p>Wind speed: {weather.current.wind_kph} km/h</p>
        <p>Air humidity: {weather.current.humidity}%</p>
        <p>Pressure: {weather.current.pressure_mb} mb</p>
        <p>Cloud cover: {weather.current.cloud}%</p>
        <p>Dew point: {Math.round(weather.current.dewpoint_c)}°C</p>
        <p>Heat index: {Math.round(weather.current.heatindex_c)}°C</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
