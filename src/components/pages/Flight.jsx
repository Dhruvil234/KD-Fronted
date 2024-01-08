import React, { useState } from 'react';
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
      
    } catch (error) {
        alert(error.errors.join('\n'));
    }
  };
  
  const containerStyle = {
    backgroundImage: 'url("https://travelobiz.com/wp-content/uploads/2021/11/Singapore-Airlines-Resumes-Flight-Bookings-From-India.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className='flightpage' style={containerStyle}>
      <h3 className='flightTag'>Book Flight Ticket Online</h3>

      {/* Departure City */}
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

      {/* Destination City */}
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

      {/* Departure Date */}
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
          onChange={(selectedOption) => setSelectedSeat(selectedOption)}
        />
      </div>

      {/* Radio Buttons */}
      <div className='radioField'>
        <label>Class :</label>
        <div>
          <label className='radioLabel'>
            <input
              type='radio'
              value='economy'
              checked={classSelection?.value === 'economy'}
              onChange={() => setClassSelection({ value: 'economy', label: 'Economy' })}
            />
            Economy
          </label>
          <label className='radioLabel'>
            <input
              type='radio'
              value='premium-economy'
              checked={classSelection?.value === 'premium-economy'}
              onChange={() => setClassSelection({ value: 'premium-economy', label: 'Premium Economy' })}
            />
            Premium Economy
          </label>
          <label className='radioLabel'>
            <input
              type='radio'
              value='business'
              checked={classSelection?.value === 'business'}
              onChange={() => setClassSelection({ value: 'business', label: 'Business' })}
            />
            Business
          </label>
        </div>
      </div>

      {/* Search Button */}
      <button type='submit' className='flightbtn' onClick={handleSearch}>
        Search Flights
      </button>
    </div>
  );
};
