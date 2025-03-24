import axios from 'axios';

const API_KEY = '462699fd4bf8aaa38c17714854ce0a88';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (location) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Error fetching weather data';
  }
};