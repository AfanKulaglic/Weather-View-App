import React from 'react';

export const Card4 = ({ weatherData }) => {
  const { sunrise, sunset } = weatherData.forecast.forecastday[0].astro;

  return (
    <>
      <div className='title'>
        <h2 id='title-text'>Daylight</h2>
      </div>
      <section className='card-4'>
        <img src='https://i.ibb.co/ZhnYGcK/screen-0.png' alt='Daylight' />
        <div>
          <p>{sunrise}</p><br />
          <p>{sunset}</p>
        </div>
      </section>
    </>
  );
}