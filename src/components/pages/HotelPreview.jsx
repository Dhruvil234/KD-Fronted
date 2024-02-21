import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const RAZORPAY_ID_KEY = import.meta.env.VITE_RAZORPAY_ID_KEY;
const API = import.meta.env.VITE_BACKENDAPI;
const sendHotelBookingApi = `${API}/api/bookhotel`;

const containerStyle = {
  backgroundImage:'url("https://img.freepik.com/free-photo/blur-hotel-room_74190-5745.jpg?w=996&t=st=1706090244~exp=1706090844~hmac=1cc438fc8fa33990d67ccb3adad8ad0969c5f3150110444a78cc2047c566189d")',
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const Hotelpreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedCheckinDate,
    selectedCheckoutDate,
    selectedHotelName,
    userSelectedHotelService,
    selectedHotelPrice,
    selectedHotelRating,
    counter,
    childcounter,
    roomcounter,
    cityName,
  } = location.state || {};

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check if user details are available in local storage
    const storedUserName = localStorage.getItem("userFullName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");

    // If not available, redirect to register page
    if (!storedUserName || !storedUserEmail) {
      navigate("/register");
    } else {
      // Set user details for display
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
      if (!token) {
        navigate("/Login");
      }
    }
  }, [navigate]);

  const sendHotelBooking = async (response) => {
    // Extracting data from the response and other details
    const hotelBookingData = {
      hotelName: selectedHotelName,
      city: cityName,
      checkInDate: selectedCheckinDate
        ? selectedCheckinDate.toLocaleDateString("en-GB")
        : "No date selected",
      checkOutDate: selectedCheckoutDate
        ? selectedCheckoutDate.toLocaleDateString("en-GB")
        : "No date selected",
      price: selectedHotelPrice,
      rating: selectedHotelRating,
      service: userSelectedHotelService,
      adult: counter,
      children: childcounter,
      hotelroom: roomcounter,
      name: userName,
      email: userEmail,
      paymentResponse: response,
    };

    try {
      // Send POST request to the API endpoint
      const response = await fetch(sendHotelBookingApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelBookingData),
      });

      // Check if the response is OK
      if (response.ok) {
        alert("Hotel Booking Details sended to Your Email");
      } else {
        // Display error message
        alert("Failed to send hotel booking details to your Email!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while booking hotel");
    }
  };

  const handlePaymentSuccess = (response) => {
    // Call sendHotelBooking function with the payment response
    sendHotelBooking(response);
    // Display success message
    toast.success("Hotel Booked Successfully");
    // Navigate to home page
    navigate("/");
  };

  const handleHotelBooking = () => {
    const storedUserName = localStorage.getItem("userFullName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const options = {
      key: RAZORPAY_ID_KEY,
      amount: selectedHotelPrice * 100, // Amount in smallest currency unit (cents)
      currency: "INR",
      name: "skynet",
      description: "Hotel Booking",
      image: "https://iili.io/J19QQjI.png",
      handler: handlePaymentSuccess,
      prefill: {
        name: storedUserName,
        email: storedUserEmail,
      },
      theme: {
        color: "#ff735c", // Your theme color
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="hotelpreviewdiv" style={containerStyle}>
      <h2 className="hotelbookingtag">Hotel Booking Preview</h2>
      <h2 className="hotelbookinginfo1">{selectedHotelName}</h2>
      <h2 className="hotelbookinginfo1">city:{cityName}</h2>
      <p className="hotelbookinginfo2">
        Check-in Date :{" "}
        {selectedCheckinDate
          ? selectedCheckinDate.toLocaleDateString("en-GB")
          : "No date selected"}
      </p>
      <p className="hotelbookinginfo3">
        Check-out Date :{" "}
        {selectedCheckoutDate
          ? selectedCheckoutDate.toLocaleDateString("en-GB")
          : "No date selected"}
      </p>
      <p className="hotelbookinginfo4">Seller : KD Travels</p>
      <p className="hotelbookinginfo5">Ratting :{selectedHotelRating}</p>
      <p className="hotelbookinginfo5">Service :{userSelectedHotelService}</p>
      <p className="hotelbookinginfo5">Adult :{counter}</p>
      <p className="hotelbookinginfo5">Children :{childcounter}</p>
      <p className="hotelbookinginfo5">Room :{roomcounter}</p>
      <p className="hotelbookinginfo6">Price :Rs.{selectedHotelPrice}/-</p>
      <p className="hotelbookinginfo7">Name: {userName}</p>
      <p className="hotelbookinginfo8">Email: {userEmail}</p>
      <button
        type="submit"
        onClick={handleHotelBooking}
        className="hotelpreviewbtn"
      >
        Proceed to Payment
      </button>
    </div>
  );
};
