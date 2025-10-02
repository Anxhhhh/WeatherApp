import React, { useState, useContext } from 'react';
import { MyStore } from '../context/Mycontext';

const CitySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { searchCity, loading, currentCity, weather } = useContext(MyStore);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    await searchCity(searchTerm);
    setSearchTerm('');
    setIsSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
      <div className="flex items-center space-x-2">
        <span className="material-icons text-lg">location_on</span>
        <div className="relative flex-1 sm:flex-none">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search city..."
            className="bg-transparent border-b border-white/30 focus:border-white outline-none px-2 py-1 text-white placeholder-white/70 w-full sm:min-w-[200px]"
            disabled={loading || isSearching}
          />
          {(loading || isSearching) && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || isSearching || !searchTerm.trim()}
          className="material-icons text-lg hover:text-gray-300 transition-colors disabled:opacity-50"
        >
          search
        </button>
      </div>
      <div className="text-sm sm:text-base">
        <span className="font-medium">
          {weather ? `${weather.location.name}, ${weather.location.region}` : 'Loading...'}
        </span>
      </div>
    </div>
  );
};

export default CitySearch;
