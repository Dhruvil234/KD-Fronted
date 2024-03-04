import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const RAZORPAY_ID_KEY = import.meta.env.VITE_RAZORPAY_ID_KEY;
const API = import.meta.env.VITE_BACKENDAPI;
const sendHolidayPackageApi = `${API}/api/bookholiday`;


export const HolidayBookingPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || null;
  const holidayPackage = location.state?.holidayPackage || null;
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
  const sendPackage = async (response) => {
    // Extracting data from the response and other details
    const packageData = {
        holidayTitle: holidayPackage?.holidayName,
        city: holidayPackage?.city,
        duration: holidayPackage?.duration,
        dateOfTravel: selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'No date selected',
        service: holidayPackage?.service,
        price: holidayPackage?.price,
        name: userName,
        email: userEmail,
        paymentResponse: response
    };

    try {
        // Send POST request to the API endpoint
        const response = await fetch(sendHolidayPackageApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(packageData)
        });

        // Check if the response is OK
        if (response.ok) {
            alert('Holiday Package Detail sended to Your Email');
        } else {
            // Display error message
            alert('Failed to send holiday package to your Email!');
        }
    } catch (error) {
        console.error('Error:', error);
        // Display error message
        alert('An error occurred while booking holiday package');
    }
};

  //  Payment success function
  const handlePaymentSuccess = (response) => {
    // Call sendPackage function with the payment response
    sendPackage(response);
    // Display success message
    toast.success("Holiday Package Booked Successfully");
    // Navigate to home page
    navigate("/");
  };

  const handlebookholiday = () => {
    const storedUserName = localStorage.getItem("userFullName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const options = {
      key: RAZORPAY_ID_KEY,
      amount: holidayPackage?.price * 100, // Amount in smallest currency unit (cents)
      currency: "INR",
      name: "skynet",
      description: "Holiday Package Booking",
      image: 'https://iili.io/JMBpb94.png',
      handler: handlePaymentSuccess,
      prefill: {
        name: storedUserName,
        email: storedUserEmail,
      },
      theme: {
        color: "#0000ff", // Your theme color
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  const containerStyle = {
    backgroundImage:
      'url("https://holidaypackages.yatra.com/media/test_module_1/2021/Aug/72d31d54a22713735e46135fcec834a6.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 1.5)",
  };
  return (
    <div className="holidaybookingpreview" style={containerStyle}>
      <h2 className="holidaybookingtag">Holiday Booking Preview</h2>
      <h2 className="holidaybookinginfo1">{holidayPackage?.holidayName}</h2>
      <p className="holidaybookinginfo2">City: {holidayPackage?.city}</p>
      <p className="holidaybookinginfo2">
        Duration: {holidayPackage?.duration}
      </p>
      <p className="holidaybookinginfo3">
        Date of Travel:{" "}
        {selectedDate
          ? selectedDate.toLocaleDateString("en-GB")
          : "No date selected"}
      </p>
      <p className="holidaybookinginfo4">Seller: {holidayPackage?.seller}</p>
      <p className="holidaybookinginfo5">Service: {holidayPackage?.service}</p>
      <p className="holidaybookinginfo6">Price:Rs. {holidayPackage?.price}/-</p>
      <p className="holidaybookinginfo7">Name: {userName}</p>
      <p className="holidaybookinginfo8">Email: {userEmail}</p>
      <button
        type="submit"
        onClick={handlebookholiday}
        className="holidaybookbtn"
      >
         Proceed to Payment
      </button>
    </div>
  );
};
