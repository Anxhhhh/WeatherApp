import React, { useContext } from 'react';
import { MyStore } from '../context/Mycontext';

const WeeklyForecast = () => {
  const { forecast, loading } = useContext(MyStore);

  if (loading || !forecast) {
    return (
      <footer className="p-6 rounded-lg" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </footer>
    );
  }

  const weeklyData = forecast.forecast.forecastday.map((day, index) => {
    const date = new Date(day.date);
    const dayName = index === 0 ? 'TODAY' : date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const dateStr = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    
    return {
      day: dayName,
      date: dateStr,
      min: `${Math.round(day.day.mintemp_c)}°`,
      max: `${Math.round(day.day.maxtemp_c)}°`,
      condition: day.day.condition.text,
      icon: `https:${day.day.condition.icon}`
    };
  });

  return (
    <footer className="p-3 sm:p-4 lg:p-6 rounded-lg" style={{
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <div>
          <button className="font-bold border-b-2 border-white pb-1 text-sm sm:text-base">TODAY</button>
        </div>
        <button className="border border-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
          SHOW FOR {weeklyData.length} DAYS
        </button>
      </div>
      
      {/* Mobile: Vertical list */}
      <div className="sm:hidden space-y-3">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
          }}>
            <div className="flex items-center space-x-3">
              <img 
                alt={`${day.condition} icon`} 
                className="w-10 h-10" 
                src={day.icon}
              />
              <div>
                <p className="font-semibold text-sm">{day.day}</p>
                <p className="text-xs text-gray-300">{day.date}</p>
                <p className="text-xs text-gray-400">{day.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{day.max}</p>
              <p className="text-xs text-gray-400">{day.min}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Desktop: Grid layout */}
      <div className="hidden sm:grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 lg:gap-4">
        {weeklyData.map((day, index) => (
          <div key={index} className="text-center">
            <p className="font-semibold text-xs lg:text-sm">{day.day}</p>
            <p className="text-xs text-gray-300 mb-2">{day.date}</p>
            <p className="text-xs">min. {day.min}</p>
            <p className="text-xs mb-2 lg:mb-4">max. {day.max}</p>
            <img 
              alt={`${day.condition} icon`} 
              className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-1 lg:mb-2" 
              src={day.icon}
            />
            <p className="text-xs lg:text-sm">{day.condition}</p>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default WeeklyForecast;