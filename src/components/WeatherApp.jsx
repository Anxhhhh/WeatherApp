import React from 'react';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';
import CitySearch from './CitySearch';

const WeatherApp = () => {
  return (
    <div className="relative" 
         style={{
           minHeight: '100vh',
           backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TmF0dXJlfGVufDB8fDB8fHww')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      <div className="absolute" style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
      }}></div>
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 text-white" style={{
        backdropFilter: 'blur(2px)'
      }}>
        {/* Header */}
        {/* Header */}
        <header className="mb-6 sm:mb-8 lg:mb-12">
          {/* Mobile Header */}
          <div className="flex flex-col space-y-4 sm:hidden">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold tracking-wider">SYNOPTIC</h1>
              <button className="flex items-center space-x-2">
                <span className="material-icons">menu</span>
              </button>
            </div>
            <CitySearch />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button className="font-bold">°C</button>
                <span className="text-gray-400">|</span>
                <button className="text-gray-400">°F</button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="font-medium">EN</button>
                <button className="text-gray-400">RU</button>
              </div>
            </div>
          </div>
          
          {/* Desktop Header */}
          <div className="hidden sm:flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wider">SYNOPTIC</h1>
            
            <div className="flex items-center space-x-4">
              <CitySearch />
              <div className="flex items-center space-x-2 text-lg">
                <button className="font-bold">°C</button>
                <span className="text-gray-400">|</span>
                <button className="text-gray-400">°F</button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button className="font-medium">EN</button>
                <button className="text-gray-400">RU</button>
              </div>
              <button className="flex items-center space-x-2">
                <span className="font-medium hover:scale-92 hover:cursor-pointer">MENU</span>
                <span className="material-icons hover:scale-92 hover:cursor-pointer">menu</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
          <CurrentWeather />
          <HourlyForecast />
        </main>

        {/* Weekly Forecast */}
        <WeeklyForecast />
      </div>
    </div>
  );
};

export default WeatherApp;
