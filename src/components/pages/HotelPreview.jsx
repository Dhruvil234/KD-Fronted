import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const containerStyle = {
  backgroundImage: 'url("https://img.freepik.com/free-photo/blur-hotel-room_74190-5745.jpg?w=996&t=st=1706090244~exp=1706090844~hmac=1cc438fc8fa33990d67ccb3adad8ad0969c5f3150110444a78cc2047c566189d")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export const Hotelpreview = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { selectedCheckinDate, 
    selectedCheckoutDate, 
    selectedHotelName, 
    userSelectedHotelService,   
    selectedHotelPrice, 
    selectedHotelRating, 
    counter,
    childcounter,
    roomcounter,
    cityName } = location.state || {};


  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user details are available in local storage
    const storedUserName = localStorage.getItem('userFullName');
    const storedUserEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');

    // If not available, redirect to register page
    if (!storedUserName || !storedUserEmail) {
      navigate('/register');
    } else {
      // Set user details for display
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
      if(!token){
        navigate('/Login');
      }
    }
  }, [navigate]);

  const handleHotelBooking = () => {
    navigate('/');
    toast.success("Hotel Booked Successfully");
  };

  return (
    <div className='hotelpreviewdiv' style={containerStyle}>
      <h2 className='hotelbookingtag'>Hotel Booking Preview</h2>
      <h2 className='hotelbookinginfo1'>{selectedHotelName}</h2>
      <h2 className='hotelbookinginfo1'>city:{cityName}</h2>
      <p className='hotelbookinginfo2'>Check-in Date : {selectedCheckinDate ? selectedCheckinDate.toLocaleDateString('en-GB') : 'No date selected'}</p>
      <p className='hotelbookinginfo3'>Check-out Date : {selectedCheckoutDate ? selectedCheckoutDate.toLocaleDateString('en-GB') : 'No date selected'}</p>
      <p className='hotelbookinginfo4'>Seller : KD Travels</p>
      <p className='hotelbookinginfo5'>Ratting :{selectedHotelRating}</p>
      <p className='hotelbookinginfo5'>Service :{userSelectedHotelService}</p>
      <p className='hotelbookinginfo5'>Adult :{counter}</p>
      <p className='hotelbookinginfo5'>Children :{childcounter}</p>
      <p className='hotelbookinginfo5'>Room :{roomcounter}</p>
      <p className='hotelbookinginfo6'>Price :Rs.{selectedHotelPrice}/-</p>
      <p className='hotelbookinginfo7'>Name: {userName}</p>
      <p className='hotelbookinginfo8'>Email: {userEmail}</p>
      <button type='submit' onClick={handleHotelBooking} className='hotelpreviewbtn'>
        Book Now
      </button>
    </div>
  );
};
