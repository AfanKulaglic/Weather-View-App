// redux/weatherReducer.js

const storedCity = localStorage.getItem('weatherCity') || 'Sarajevo';

const initialState = {
  weatherCity: storedCity,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WEATHER_CITY':
      return {
        ...state,
        weatherCity: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
