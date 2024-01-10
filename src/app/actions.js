// redux/weatherActions.js

export const setWeatherCity = (city) => {
  localStorage.setItem('weatherCity', city);

  return {
    type: 'SET_WEATHER_CITY',
    payload: city,
  };
};
  