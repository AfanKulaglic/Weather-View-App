import React, { useEffect, useState } from 'react'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherCity } from '../app/actions';
import { FaMountainCity } from "react-icons/fa6";
import { TextField } from '@mui/material';

export const Start = () => {
  const navigate = useNavigate();

  const startApp = () => {
    navigate('/Main');
  };

  // redux toolkit

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const weatherCity = useSelector((state) => state.weatherCity);
  const [isTyping, setIsTyping] = useState(false)

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(true)

    try {
      setError(null);

      if (!value) {
        throw new Error('Weather city not provided');
      }

      const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${value}&days=3`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '39ed008c45msh57a563bbc163d77p10896ejsn72ba0f1b7281',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Weather API request failed');
      }

      const result = await response.json();
      console.log(result);
      setWeatherData(result);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSubmit = () => {
    dispatch(setWeatherCity(inputValue));
    startApp()
  };

  // api weather

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        if (!weatherCity) {
          throw new Error('Weather city not provided');
        }

        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${weatherCity}&days=3`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '39ed008c45msh57a563bbc163d77p10896ejsn72ba0f1b7281',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Weather API request failed');
        }

        const result = await response.json();
        console.log(result);
        setWeatherData(result);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchData();
  }, [weatherCity]);


  return (
    <div className='start'>
      <section>
        <FaMountainCity className='icon' />
        <h2>WeatherView</h2>
      </section>

      <div>
        <h2>Search City</h2>
        <p>Search by city name or cordinates</p>
        <TextField
          id="standard-basic"
          label="Search by city name or coordinates"
          variant="standard"
          onChange={handleInputChange}
          value={inputValue}
          InputLabelProps={{
            style: { color: '#3963b3' }
          }}
        />
        {(weatherData && inputValue !== "") &&
          <h3 onClick={handleSubmit}>{weatherData.location.name}, {weatherData.location.country}</h3>
        }
      </div>
    </div>
  )
}
