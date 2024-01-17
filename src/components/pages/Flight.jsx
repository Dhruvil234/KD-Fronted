import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';

let responseData="";
export const Flight = () => {
  const [departureCity, setDepartureCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [classSelection, setClassSelection] = useState(null);
  const [flightprice,setflightprice] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate(); 
  const handleBookNowClick = (flight) => {
    navigate('/flightpreview', {
      state: {
        departureCity,
        destinationCity,
        departureDate,
        selectedSeat,
        classSelection,
        flightprice:flight.price,  
        selectedFlight: flight,
      },
    });
  };
  const cityOptions = [
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Hyderabad', label: 'Hyderabad' },
  ];

  const seatOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  const validationSchema = Yup.object().shape({
    From: Yup.object().nullable().required('Departure city is required'),
    To: Yup.object().nullable().required('Destination city is required'),
    DepartureDate: Yup.date().min(new Date(), 'Departure date must be in the future').required('Departure date is required'),
    Seat: Yup.object().nullable().required('Seat selection is required'),
    Class: Yup.object().nullable().required('Class selection is required'),
  });

  const handleDepartureCityChange = (selectedOption) => {
    setDepartureCity(selectedOption);
    setDestinationCity(null);
  };

  const handleSearch = async () => {
    try {
      const formData = {
        From: departureCity,
        To: destinationCity,
        DepartureDate: departureDate,
        Seat: selectedSeat,
        Class: classSelection,
      };
      await validationSchema.validate(formData, { abortEarly: false });
      //console.log(formData)
      const requestData = {
        from: formData.From.value,
        to: formData.To.value,
        flightClass: formData.Class.value,
      };
      //console.log(requestData)
      const response = await fetch('http://localhost:8080/api/findflights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    responseData= await response.json();
    console.log(responseData);
    
      setFormSubmitted(true);
      setFlightData(responseData.flights);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = error.inner.reduce((messages, innerError) => {
          return { ...messages, [innerError.path]: innerError.message };
        }, {});
        // Display error messages for each field
        alert(
          `\n${Object.keys(errorMessages)
            .map((key) => `${key}: ${errorMessages[key]}`)
            .join('\n')}`
        );
      } else {
        alert(error.message);
      }
    }
  };

  const containerStyle = {
    backgroundImage: 'url("https://www.shutterstock.com/image-photo/white-model-plane-airplane-on-260nw-1696581118.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <div className='flightpage' style={containerStyle}>
        <h3 className='flightTag'>Book Flight Ticket Online</h3>

        <div className='flightField'>
          <label>Departure From :</label>
          <Select
            options={cityOptions}
            className='selectcity'
            placeholder='Select City'
            value={departureCity}
            onChange={handleDepartureCityChange}
          />
        </div>

        <div className='flightField'>
          <label>Departure To :</label>
          <Select
            options={cityOptions.filter((city) => city.value !== departureCity?.value)}
            className='selectcity'
            placeholder='Select City'
            value={destinationCity}
            onChange={(selectedOption) => setDestinationCity(selectedOption)}
            isDisabled={!departureCity}
          />
        </div>

        <div className='flightField'>
          <label>Departure Date : </label>
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            dateFormat='dd/MM/yyyy'
            className='datepicker'
            minDate={new Date()}
          />
        </div>

        {/* Seat Selection */}
        <div className='flightField'>
          <label>Seat :</label>
          <Select
            options={seatOptions}
            className='selectcity'
            placeholder='Select Seat'
            value={selectedSeat}
            classNames='flightseat'
            onChange={(selectedOption) => setSelectedSeat(selectedOption)}
          />
        </div>

        {/* Class Selection - Radio Buttons */}
<div className='radioField'>
  <label>Class :</label>
  <div className='radioButtons'>
      <input
        type='radio'
        value='Economy'
        checked={classSelection?.value === 'Economy'}
        onChange={() => setClassSelection({ value: 'Economy', label: 'Economy' })}
      />
      Economy
      <input
        type='radio'
        value='PremiumEconomy'
        checked={classSelection?.value === 'PremiumEconomy'}
        onChange={() => setClassSelection({ value: 'PremiumEconomy', label: 'Premium Economy' })}
      />
        Premium Economy
      <input
          type='radio'
          value='Business'
          checked={classSelection?.value === 'Business'}
          onChange={() => setClassSelection({ value: 'Business', label: 'Business' })}
          />
          Business
        </div>
      </div>

        {/* Search Button */}
        <button type='submit' className='flightbtn' onClick={handleSearch}>
          Search Flights
        </button>
      </div>
        
      {formSubmitted && responseData && responseData.success && responseData.flights && (
  <div className=''>
    {responseData.flights.map((flight) => (
      <div key={flight._id} className='additionalContainer'>
        <p>From: <br/>{flight.from}</p>
        <p>To: <br/>{flight.to}</p>
        <p>Departure Date: <br/>{departureDate.toDateString()}</p>
        <p>Class: <br/>{flight.flightClass}</p>
        <p>Price: <br/>{flight.price}</p>

        {/* Book Now Button */}
        <button className='bookNowBtn' onClick={() => handleBookNowClick(flight)}>Book Now</button>
      </div>
    ))}
  </div>
)}

    </div>
  );
};