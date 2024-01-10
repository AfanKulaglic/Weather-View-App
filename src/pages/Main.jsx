import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherCity } from '../app/actions';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Navbar } from '../components/Navbar';
import { Card1 } from '../components/Card1';
import { Card2 } from '../components/Card2';
import { Card3 } from '../components/Card3';
import { Card4 } from '../components/Card4';
import { Loading } from '../components/Loading';

export const Main = () => {
  const dispatch = useDispatch();
  const weatherCity = useSelector((state) => state.weatherCity);

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = useMemo(() => {
    return () => {
      dispatch(setWeatherCity(inputValue));
    };
  }, [dispatch, inputValue]);

  const { data: weatherData, error } = useWeatherData(weatherCity);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (!weatherData) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Navbar
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputChange={handleInputChange}
      />
      <div className='col-1'>
        <Card1 weatherData={weatherData} />
        <Card2 weatherData={weatherData} />
      </div>
      <Card3 weatherData={weatherData} />
      <Card4 weatherData={weatherData} />
    </div>
  );
};

const useWeatherData = (city) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        if (!city) {
          throw new Error('Weather city not provided');
        }

        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '39ed008c45msh57a563bbc163d77p10896ejsn72ba0f1b7281',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
          },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('Weather API request failed');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchData();
  }, [city]);

  return { data, error };
};


const ErrorComponent = ({ error }) => {
  return <div>Error: {error}</div>;
};
