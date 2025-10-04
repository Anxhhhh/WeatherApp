import React from 'react';

// Interactive weather condition changer
export default function WeatherConditionChanger({ currentCondition, onConditionChange }) {
  const conditions = [
    { id: 'clear', label: 'Clear', icon: '☀️', color: 'from-yellow-400 to-orange-500' },
    { id: 'cloudy', label: 'Cloudy', icon: '☁️', color: 'from-gray-400 to-gray-600' },
    { id: 'rainy', label: 'Rainy', icon: '🌧️', color: 'from-blue-400 to-blue-600' },
    { id: 'snowy', label: 'Snowy', icon: '❄️', color: 'from-white to-gray-200' },
    { id: 'stormy', label: 'Stormy', icon: '⛈️', color: 'from-gray-600 to-red-500' }
  ];

  return (
    <div className="fixed bottom-4 left-4 z-20">
      <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-3">
        <h3 className="text-white text-sm font-semibold mb-2">Change Weather</h3>
        <div className="flex space-x-2">
          {conditions.map((condition) => (
            <button
              key={condition.id}
              onClick={() => onConditionChange(condition.id)}
              className={`relative p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                currentCondition === condition.id
                  ? 'bg-white bg-opacity-20 scale-110'
                  : 'bg-white bg-opacity-10 hover:bg-opacity-20'
              }`}
              title={condition.label}
            >
              <span className="text-lg">{condition.icon}</span>
              {currentCondition === condition.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
