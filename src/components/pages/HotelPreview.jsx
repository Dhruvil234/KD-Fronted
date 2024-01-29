import React from 'react';
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
  const selectedCheckinDate = location.state?.selectedCheckinDate || null;
  const selectedCheckoutDate = location.state?.selectedCheckoutDate || null;

  const handleHotelBooking = () => {
    navigate('/');
    toast.success("Hotel Booked Successfully");
  };

  return (
    <div className='hotelpreviewdiv' style={containerStyle}>
      <h2 className='hotelbookingtag'>Hotel Booking Preview</h2>
      <h2 className='hotelbookinginfo1'>Taj Hotel</h2>
      <p className='hotelbookinginfo2'>Check-in Date : {selectedCheckinDate ? selectedCheckinDate.toLocaleDateString('en-GB') : 'No date selected'}</p>
      <p className='hotelbookinginfo3'>Check-out Date : {selectedCheckoutDate ? selectedCheckoutDate.toLocaleDateString('en-GB') : 'No date selected'}</p>
      <p className='hotelbookinginfo4'>Seller : KD Travels</p>
      <p className='hotelbookinginfo5'>Service : Breakfast,Lunch,Dinner</p>
      <p className='hotelbookinginfo6'>Price : 19,999/</p>
      <p className='hotelbookinginfo7'>Name: Mistry Dhruvil </p>
      <p className='hotelbookinginfo8'>Email: 21bcubs@gmail.com</p>
      <button type='submit' onClick={handleHotelBooking} className='hotelpreviewbtn'>
        Book Now
      </button>
    </div>
  );
};
