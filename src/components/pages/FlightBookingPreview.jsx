import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const FlightBookingPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { departureCity,destinationCity,departureDate,selectedSeat,classSelection,flightprice} = location.state || {};
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user details are available in local storage
    const storedUserName = localStorage.getItem('userFullName');
    const storedUserEmail = localStorage.getItem('userEmail');

    // If not available, redirect to register page
    if (!storedUserName || !storedUserEmail) {
      navigate('/register');
    } else {
      // Set user details for display
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  }, [navigate]);

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
        <p className='previewDetailsTag'>Name: {userName}</p>
        <p className='previewDetailsTag'>Email: {userEmail}</p>
      <button className='paynowbtn' onClick={handleBookNowClick}>Proceed to Payment</button>
    </div>
  );
};
