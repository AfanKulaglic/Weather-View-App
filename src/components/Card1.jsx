import React, { useMemo } from 'react';

export const Card1 = ({ weatherData }) => {
  const sunsetHour = parseInt(weatherData?.forecast?.forecastday[0]?.astro?.sunset?.toString().padStart(2, '0'), 10) + 12;
  const sunriseHour = parseInt(weatherData?.forecast?.forecastday[0]?.astro?.sunrise?.toString().padStart(2, '0'), 10);
  const isDaytime = sunsetHour > parseInt(weatherData?.location.localtime.slice(10, 15), 10) && sunriseHour < parseInt(weatherData?.location.localtime.slice(10, 15), 10);

  const backgroundImageUrl = isDaytime
    ? 'https://i.ibb.co/YhZ7zcp/image-1.png'
    : 'https://i.ibb.co/80dZGgx/image-2.png';

  const sectionStyle = useMemo(() => ({
    backgroundImage: `url(${backgroundImageUrl})`
  }), [backgroundImageUrl]);

  const { name: locationCity, country: locationCountry } = weatherData?.location || {};
  const localDate = weatherData?.location.localtime.slice(0, 10);
  const localTime = weatherData?.location.localtime.slice(10, 16);
  const temperatureCelsius = weatherData?.current.temp_c;
  const temperatureFahrenheit = weatherData?.current.temp_f;
  const maxTemperature = weatherData?.forecast?.forecastday[0]?.day.maxtemp_c;
  const minTemperature = weatherData?.forecast?.forecastday[0]?.day.mintemp_c;
  const conditionText = weatherData?.current.condition.text;
  const weatherIcon = weatherData?.current.condition.icon;

  return (
    <div className='card'>
      <div className='title'>
        <h2 id='title-text'>Current Weather</h2>
      </div>
      <section className='card-1' style={sectionStyle}>
        <div className='card-top'>
          <h2>{locationCity}, {locationCountry}</h2>
          <h5>{localDate}</h5>
          <h5>{localTime}</h5>
        </div>
        <div className='card-bottom'>
          <div>
            <h1>{temperatureCelsius}°c</h1>
            <h4>{minTemperature}°c / {maxTemperature}°c</h4>
            <h3>{conditionText}</h3>
          </div>
          <img src={weatherIcon} alt="Weather Icon" loading="eager" />
        </div>
      </section>
    </div>
  );
};
