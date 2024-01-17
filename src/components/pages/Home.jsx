import React from 'react';
import Travel from '../../Images/Travel.png';
import Flight from '../../Images/Flight.png';
import Hotel from '../../Images/Hotel.png';
import Holiday from '../../Images/Holiday.png';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handlebookflight = () => {
    navigate('/Flight');
  };
  const handlebookhotel = () => {
    navigate('/Hotel');
  };
  const handlebookholiday = () => {
    navigate('/Packages');
  }
  
  return (
    <div className='parentdiv'>
      <div className='travel'>
        <div className='travelimagediv'>
          <img src={Travel} alt='Home Page' className='Travelimage' />
        </div>
        <div className='travelinfo'>
            <h1 className='travelinfotage1'>Travel</h1>
            <h1 className='travelinfotage2'>Beyond</h1>
            <h1 className='travelinfotage3'>Boundires</h1>
            <p>   We Provide Booking  service like Flights,Hotels,<br/>
          Holidays Packages with Budget price so Book Now..</p>
        </div>
      </div>

      <div className='flight'>
        <div className='flightimagediv'>
          <img src={Flight} alt='Flight' className='flightimage' />
        </div>
      </div>

      <div className='hotel'>
        <div className='hotelimagediv'>
          <img src={Hotel} alt='Hotel' className='hotelimage' />
        </div>
      </div>

      <div className='holiday'>
        <div className='holidayimagediv'>
          <img src={Holiday} alt='Home Page' className='holidayimage' />
        </div>
      </div>
    </div>
  );
};
