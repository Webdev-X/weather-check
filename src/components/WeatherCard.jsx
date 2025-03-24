import React from 'react'
import { format } from 'date-fns';
import {
  SunIcon,
  CloudIcon,
  BoltIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/solid';
// import {
//   CloudIcon,
// } from '@heroicons/react/24/outline';

const WeatherIcon = ({ condition }) => {
  const iconMap = {
    Clear: SunIcon,
    Clouds: CloudIcon,
    Rain: CloudIcon,
    Snow: CloudIcon,
    Thunderstorm: BoltIcon,
    Drizzle: CloudIcon,
    Mist: CloudIcon,
    Smoke: CloudIcon,
    Haze: CloudIcon,
    Dust: CloudIcon,
    Fog: CloudIcon,
    Sand: CloudIcon,
    Ash: CloudIcon,
    Squall: CloudIcon,
    Tornado: BoltIcon,
  };

  const IconComponent = iconMap[condition] || SunIcon;
  const isOutline = ['Rain', 'Snow', 'Drizzle'].includes(condition);

  return (
    <div className={`${isOutline ? 'text-blue-500' : 'text-yellow-500'} animate-pulse`}>
      <IconComponent className="w-24 h-24" />
    </div>
  );
};

const HumidityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 text-blue-500"
  >
    <path
      fillRule="evenodd"
      d="M10.5 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V2.25a.75.75 0 01.75-.75zM10.5 6a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm.75 10.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm8.25-9a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM1.5 10.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm13.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export const WeatherCard = ({ data }) => {
  if (!data) return null;

  const {
    name,
    sys,
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    wind: { speed, deg },
    weather,
    dt,
    visibility,
  } = data;

  const weatherCondition = weather[0]?.main;
  const description = weather[0]?.description;

  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  return (
    <div className="animate-fade-in bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
  {/* Location and Date */}
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-white">
      {name}, {sys?.country}
    </h2>
    <p className="text-gray-300">
      {format(new Date(dt * 1000), 'EEEE, MMMM d yyyy')}
    </p>
  </div>

  {/* Main Weather Info */}
  <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
    <WeatherIcon condition={weatherCondition} />
    
    <div className="text-center md:text-left">
      <p className="text-5xl font-bold text-white mb-2">
        {Math.round(temp)}°C
      </p>
      <p className="text-xl text-gray-300 capitalize">{description}</p>
      <p className="text-gray-400 mt-1">
        Feels like {Math.round(feels_like)}°C
      </p>
    </div>
  </div>

  {/* Weather Details Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    {/* High Temp */}
    <div className="flex items-center gap-2 bg-gray-700/50 p-4 rounded-lg transition-all hover:bg-gray-700/70">
      <ArrowUpIcon className="w-6 h-6 text-red-400" />
      <div>
        <p className="text-sm text-gray-300">High</p>
        <p className="font-semibold text-white">{Math.round(temp_max)}°C</p>
      </div>
    </div>

    {/* Low Temp */}
    <div className="flex items-center gap-2 bg-gray-700/50 p-4 rounded-lg transition-all hover:bg-gray-700/70">
      <ArrowDownIcon className="w-6 h-6 text-blue-400" />
      <div>
        <p className="text-sm text-gray-300">Low</p>
        <p className="font-semibold text-white">{Math.round(temp_min)}°C</p>
      </div>
    </div>

    {/* Humidity */}
    <div className="flex items-center gap-2 bg-gray-700/50 p-4 rounded-lg transition-all hover:bg-gray-700/70">
      <HumidityIcon />
      <div>
        <p className="text-sm text-gray-300">Humidity</p>
        <p className="font-semibold text-white">{humidity}%</p>
      </div>
    </div>

    {/* Wind */}
    <div className="flex items-center gap-2 bg-gray-700/50 p-4 rounded-lg transition-all hover:bg-gray-700/70">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-6 h-6 text-teal-400"
      >
        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
      </svg>
      <div>
        <p className="text-sm text-gray-300">Wind</p>
        <p className="font-semibold text-white">
          {Math.round(speed * 3.6)} km/h {getWindDirection(deg)}
        </p>
      </div>
    </div>
  </div>

  {/* Additional Weather Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Sunrise/Sunset */}
    <div className="bg-gray-700/50 p-4 rounded-lg flex items-center gap-3 transition-all hover:bg-gray-700/70">
      <ClockIcon className="w-8 h-8 text-purple-400" />
      <div>
        <p className="text-sm text-gray-300">Sunrise / Sunset</p>
        <p className="font-semibold text-white">
          {formatTime(sys?.sunrise)} / {formatTime(sys?.sunset)}
        </p>
      </div>
    </div>

    {/* Pressure/Visibility */}
    <div className="bg-gray-700/50 p-4 rounded-lg flex items-center gap-3 transition-all hover:bg-gray-700/70">
      <BoltIcon className="w-8 h-8 text-amber-400" />
      <div>
        <p className="text-sm text-gray-300">Pressure / Visibility</p>
        <p className="font-semibold text-white">
          {pressure} hPa / {(visibility / 1000).toFixed(1)} km
        </p>
      </div>
    </div>
  </div>
</div>
  );
};