import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const FlightBookingPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { departureCity,destinationCity,departureDate,selectedSeat,classSelection,flightprice} = location.state || {};

  const handleBookNowClick = () => {
    navigate('/');
    toast.success("Flight Ticket Booked Sucssesfully");
  };

  const containerStyle = {
    backgroundImage: 'url("https://blog.air.irctc.co.in/wp-content/uploads/2019/11/bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className='previewcontainer' style={containerStyle}>
      <h2 className='previewheading'>Review Flight Details</h2>
        <p className='previewDetailsTag'>From: {departureCity?.label}</p>
        <p className='previewDetailsTag'>To: {destinationCity?.label}</p>
        <p className='previewDetailsTag'>Date: {departureDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
        <p className='previewDetailsTag'>Seat: {selectedSeat?.label}</p>
        <p className='previewDetailsTag'>Class: {classSelection?.label}</p>
        <p className='previewDetailsTag'>Price: {flightprice}</p>
      <button className='paynowbtn' onClick={handleBookNowClick}>Proceed to Payment</button>
    </div>
  );
};
