import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const RAZORPAY_ID_KEY = import.meta.env.VITE_RAZORPAY_ID_KEY;
const RAZORPAY_SECRET_KEY=import.meta.env.VITE_RAZORPAY_SECRET_KEY;
const API = import.meta.env.VITE_BACKENDAPI;
const sendflightticketapi = `${API}/api/bookflight`;

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

  const sendTicket = async (response) => {
    // Extracting data from the response and other details
    const ticketData = {
      from: departureCity?.label,
      to: destinationCity?.label,
      flightClass: classSelection?.label,
      date: departureDate?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      seat: selectedSeat?.label,
      price: flightprice,
      name: userName,
      email: userEmail
    };
  
    try {
      // Send POST request to the API endpoint
      const response = await fetch(sendflightticketapi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
      });
  
      // Check if the response is OK
      if (response.ok) {
        // Display success message
        alert('Flight Ticket sended to Your Email.');
      } else {
        // Display error message
        alert('Failed to send flight ticket.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Display error message
      alert('An error occurred while booking flight ticket');
    }
  };
  

  //  Paymet sucess function
  const handlePaymentSuccess = (response) => {
    // Call sendTicket function with the payment response
    sendTicket(response);
    // Display success message
    toast.success('Flight Ticket Booked Successfully');
    // Navigate to home page
    navigate('/');
  };



  const handleBookNowClick = () => {
    const storedUserName = localStorage.getItem('userFullName');
    const storedUserEmail = localStorage.getItem('userEmail');
    const options = {
      key: RAZORPAY_ID_KEY,
      amount: flightprice * 100, // Amount in smallest currency unit (cents)
      currency: 'INR',
      name: 'skynet',
      description: 'Flight Booking',
      image: 'https://iili.io/J19QQjI.png', // skynet company logo
      handler: handlePaymentSuccess,
      prefill: {
        name: storedUserName,
        email: storedUserEmail
      },
      notes: {
        // Additional notes if needed
      },
      theme: {
        color: '#1980c3' // Your theme color
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
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
        <p className='previewDetailsTag'>Price:Rs. {flightprice}/-</p>
        <p className='previewDetailsTag'>Name: {userName}</p>
        <p className='previewDetailsTag'>Email: {userEmail}</p>
      <button className='paynowbtn' onClick={handleBookNowClick}>Proceed to Payment</button>
    </div>
  );
};
