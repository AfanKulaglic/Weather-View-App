import React from 'react';
import { FaTemperatureHalf } from 'react-icons/fa6';
import { TbCloudRain } from 'react-icons/tb';
import { FiWind, FiSun, FiCloudSnow } from 'react-icons/fi';
import { IoWaterOutline, IoSnowOutline } from 'react-icons/io5';

export const Card2 = ({ weatherData }) => {
  const currentWeather = weatherData.current;
  const forecastDay = weatherData.forecast.forecastday[0].day;

  const Card2Item = ({ icon, title, value }) => (
    <div>
      <div>
        {icon}
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );

  const feelsLike = `${currentWeather.feelslike_c}°C`;
  const chanceOfRain = `${forecastDay.daily_chance_of_rain}%`;
  const chanceOfSnow = `${forecastDay.daily_chance_of_snow}%`;
  const windSpeed = `${currentWeather.wind_kph} kph`;
  const humidity = `${currentWeather.humidity}%`;
  const uvIndex = currentWeather.uv;
  const totalSnow = `${forecastDay.totalsnow_cm} cm`;

  return (
    <div className='card'>
      <div className='title'>
        <h2 id='title-text'>Details</h2>
      </div>
      <section className='card-2'>
        <Card2Item icon={<FaTemperatureHalf id='card-2-icon' />} title='Feels like' value={feelsLike} />
        <Card2Item icon={<TbCloudRain id='card-2-icon' />} title='Chance of rain' value={chanceOfRain} />
        <Card2Item icon={<FiCloudSnow id='card-2-icon' />} title='Chance of snow' value={chanceOfSnow} />
        <Card2Item icon={<FiWind id='card-2-icon' />} title='Wind' value={windSpeed} />
        <Card2Item icon={<FiSun id='card-2-icon' />} title='UV' value={uvIndex} />
        <Card2Item icon={<IoWaterOutline id='card-2-icon' />} title='Humidity' value={humidity} />
        <Card2Item icon={<IoSnowOutline id='card-2-icon' />} title='Total snow' value={totalSnow} />
      </section>
    </div>
  );
};
