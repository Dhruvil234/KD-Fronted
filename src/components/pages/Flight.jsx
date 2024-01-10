import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';


export const Flight = () => {
  const [departureCity, setDepartureCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [classSelection, setClassSelection] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate(); 
  const handleBookNowClick = () => {
      navigate('/flightpreview');
    
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

      console.log(formData);

      setFormSubmitted(true);

    } catch (error) {
      alert(error.errors.join('\n'));
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
    
      {formSubmitted && (
        <div className='additionalContainer'>
          
          <p>From: <br/>{departureCity?.label}</p>
          <p>To: <br/>{destinationCity?.label}</p>
          <p>Date: <br/>{departureDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
          <p>Class: <br/>{classSelection?.label}</p>
          <p>Price: <br/>9,999</p>
          <button className='bookNowBtn' onClick={handleBookNowClick}>Book Now</button>
        </div>
      )}
    </div>
  );
};
