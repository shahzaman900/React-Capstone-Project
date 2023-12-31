import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const countries = [
  'Afghanistan',
  'China',
  'India',
  'Iran',
  'Nepal',
  'Pakistan',
  'Tajikistan',
];

export const getWeatherData = createAsyncThunk(
  'get/WeatherData',
  async () => {
    try {
      const promises = countries.map(async (country) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=0ef8f943315bb9a8b720fc0462bd11e2&units=metric`,
        );
        if (!response.ok) {
          throw new Error('Network Error');
        }
        const data = await response.json();
        return data;
      });
      return Promise.all(promises);
    } catch (error) {
      throw new Error('Failed to get weather data');
    }
  },
);

const cityWeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: [],
    status: 'not loaded',
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.status = 'Date Loeaded';
        state.weather = action.payload;
      })
      .addCase(getWeatherData.pending, (state, action) => {
        state.status = 'data not loaded';
        state.status = action.payload;
      });
  },
});

export const selectedWeatherData = (state) => state.weather.weather;
export const selectWeatherStatus = (state) => state.weather.status;

export const selectedCrountry = (state, country) => state.weather.weather.find(
  (city) => city.name === country,
);

export default cityWeatherSlice.reducer;
