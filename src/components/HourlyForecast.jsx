import React, { useContext } from 'react';
import WeatherDetails from './WeatherDetails';
import { MyStore } from '../context/Mycontext';

const HourlyForecast = () => {
  const { forecast, loading } = useContext(MyStore);

  if (loading || !forecast) {
    return (
      <>
        <WeatherDetails />
        <div className="md:col-span-1 p-4 rounded-lg" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        </div>
      </>
    );
  }

  // Get next 8 hours of forecast data
  const currentHour = new Date().getHours();
  const todayHours = forecast.forecast.forecastday[0].hour;
  const tomorrowHours = forecast.forecast.forecastday[1]?.hour || [];
  
  const hourlyData = [];
  
  // Get remaining hours from today
  for (let i = currentHour; i < 24 && hourlyData.length < 8; i++) {
    const hour = todayHours[i];
    hourlyData.push({
      time: new Date(hour.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      temp: `${Math.round(hour.temp_c)}°`,
      icon: `https:${hour.condition.icon}`,
      condition: hour.condition.text,
      isImage: true
    });
  }
  
  // Fill remaining slots with tomorrow's hours if needed
  for (let i = 0; i < tomorrowHours.length && hourlyData.length < 8; i++) {
    const hour = tomorrowHours[i];
    hourlyData.push({
      time: new Date(hour.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      temp: `${Math.round(hour.temp_c)}°`,
      icon: `https:${hour.condition.icon}`,
      condition: hour.condition.text,
      isImage: true
    });
  }

  const getPeriodLabel = (time) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 0 && hour < 6) return 'NIGHT';
    if (hour >= 6 && hour < 12) return 'MORNING';
    if (hour >= 12 && hour < 18) return 'DAY';
    return 'EVENING';
  };

  return (
    <>
      <WeatherDetails />
      <div className="lg:col-span-1 p-3 sm:p-4 rounded-lg" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="hidden sm:flex justify-between text-xs mb-2 text-gray-300">
          <span>NIGHT</span>
          <span>MORNING</span>
          <span>DAY</span>
          <span>EVENING</span>
        </div>
        <div className="grid grid-cols-4 sm:flex sm:justify-between items-end gap-2 sm:gap-0">
          {hourlyData.slice(0, 8).map((hour, index) => (
            <div key={index} className="text-center">
              {hour.isImage ? (
                <img 
                  src={hour.icon} 
                  alt={hour.condition}
                  className="w-6 h-6 sm:w-8 sm:h-8 mx-auto"
                />
              ) : (
                <span className="material-icons text-lg sm:text-2xl">{hour.icon}</span>
              )}
              <p className="font-semibold mt-1 text-xs sm:text-sm">{hour.temp}</p>
              <p className="text-xs text-gray-400">{hour.time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HourlyForecast;
