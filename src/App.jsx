import React, { useState } from 'react';
import { Loader } from './components/Loader';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { getWeather } from './services/weather';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (location) => {
    try {
      setLoading(true);
      setError('');
      const data = await getWeather(location);
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4 md:p-8 w-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Weather App
        </h1>
        <SearchBar onSearch={handleSearch} />
        
        
        {error && (
          <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {loading ? <Loader/> : <WeatherCard data={weather} />}
      </div>
    </div>
  );
}