import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Button from '@mui/material/Button';
import { GrNext, GrPrevious } from "react-icons/gr";

export const Card3 = ({ weatherData }) => {
  const [currentForecastDay, setCurrentForecastDay] = useState(0);

  const responsive = {
    0: { items: 3.6 },
    568: { items: 2 },
    1024: { items: 10.5 },
  };

  const handleNextClick = () => {
    if (currentForecastDay < 2) {
      setCurrentForecastDay((prevForecastDay) => (prevForecastDay + 1) % 3);
    }
  };

  const handlePrevClick = () => {
    if (currentForecastDay > 0) {
      setCurrentForecastDay((prevForecastDay) => (prevForecastDay - 1 + 3) % 3);
    }
  };

  return (
    <>
      <div className='title'>
        <h2 id='title-text'>Forecast</h2>
        <div>
          <Button id='button' size="small" variant="outlined" onClick={handlePrevClick}><GrPrevious /></Button>
          <p>{currentForecastDay === 0 ? 'Today' : weatherData.forecast.forecastday[currentForecastDay].date}</p>
          <Button id='button' size="small" variant="outlined" onClick={handleNextClick}><GrNext /></Button>
        </div>
      </div>
      <section className='card-3'>
        <section>
          <AliceCarousel
            mouseTracking
            items={weatherData.forecast.forecastday[currentForecastDay].hour.map((hourData, index) => {
              const hour = (parseInt([0]) + index).toString().padStart(2, '0');

              return (
                <div className="item" data-value={index + 1} key={index + 1}>
                  <h5>{hour} : 00</h5>
                  <img src={hourData?.condition.icon} />
                  <p>{hourData?.temp_c}</p>
                </div>
              );
            })}
            responsive={responsive}
            disableDotsControls
            disableButtonsControls
          />
        </section>
      </section>
    </>
  )
}
