import React, { useContext } from 'react';
import { MyStore } from '../context/Mycontext';

const CurrentWeather = () => {
  const { weather, loading, error } = useContext(MyStore);

  if (loading) {
    return (
      <div className="md:col-span-1 p-4 rounded-lg" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:col-span-1 p-4 rounded-lg" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <p className="text-red-300">Error: {error}</p>
      </div>
    );
  }

  if (!weather) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return (
    <div className="lg:col-span-1 p-3 sm:p-4 rounded-lg" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <p className="font-semibold text-base sm:text-lg mb-2">{formatDate(weather.location.localtime)}</p>
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
        <img 
          alt={weather.current.condition.text} 
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" 
          src={`https:${weather.current.condition.icon}`}
        />
        <div className="text-center sm:text-left">
          <p className="text-4xl sm:text-5xl lg:text-7xl font-bold">{Math.round(weather.current.temp_c)}°C</p>
          <p className="text-base sm:text-lg">Feels like {Math.round(weather.current.feelslike_c)}°</p>
        </div>
      </div>
      <div className="mt-4 text-xs sm:text-sm grid grid-cols-2 gap-1 sm:gap-2">
        <p>Humidity: {weather.current.humidity}%</p>
        <p>Wind: {weather.current.wind_kph} km/h</p>
        <p>Pressure: {weather.current.pressure_mb} mb</p>
        <p>UV Index: {weather.current.uv}</p>
      </div>
      <p className="mt-4 text-sm sm:text-base">{weather.current.condition.text}. Visibility: {weather.current.vis_km} km.</p>
    </div>
  );
};

export default CurrentWeather;
