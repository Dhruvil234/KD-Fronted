import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BACKENDAPI;
let updateflight = `${API}/api/updateflight`

const cityOptions = [
  { value: 'Ahmedabad', label: 'Ahmedabad' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Hyderabad', label: 'Hyderabad' },
];

const classOptions = [
  { value: 'Economy', label: 'Economy' },
  { value: 'PremiumEconomy', label: 'Premium Economy' },
  { value: 'Business', label: 'Business' },
];

export const Updateflight = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userfrom, setFrom] = useState(location.state?.from || cityOptions[0]);
  const [userto, setTo] = useState(location.state?.to || cityOptions[0]);
  const [userflightClass, setFlightClass] = useState(location.state?.flightClass || classOptions[0]);
  const [userflightPrice, setFlightPrice] = useState(location.state?.price || null);
 
  useEffect(() => {
    if (location.state) {
      setFrom(cityOptions.find(option => option.value === location.state.from) || cityOptions[0]);
      setTo(cityOptions.find(option => option.value === location.state.to) || cityOptions[0]);
      setFlightClass(classOptions.find(option => option.value === location.state.flightClass) || classOptions[0]);
      setFlightPrice(location.state.price || null);
    }
  }, [location.state]);
  
  const handleFromChange = (selectedOption) => {
    setFrom(selectedOption);
  };

  const handleToChange = (selectedOption) => {
    setTo(selectedOption);
  };

  const handleClassChange = (selectedOption) => {
    setFlightClass(selectedOption);
  };

  const handlePriceChange = (e) => {
    setFlightPrice(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const id = location.state.id; // Access the id from location.state
      const url = `${updateflight}/${id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: userfrom.value,
          to: userto.value,
          flightClass: userflightClass.value,
          price: userflightPrice,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update flight details');
      }
  
      const data = await response.json();
      toast.success(data.message);
      navigate('/AdminPage');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update flight details');
    }
  };

  return (
    <div className='updateflightdiv'>
      <h3 className='updateflighttag'>Update Flight Details</h3>
      <div className='updateflightfrom'>
        <label className='updateflightlabel1'>Departure From :</label>
        <Select
          id='fromcity'
          options={cityOptions}
          className='addcity1'
          value={userfrom}
          onChange={handleFromChange}
        />
      </div>
      <div className='updateflightto'>
        <label className='updateflightlabel2'>Departure To :</label>
        <Select
          value={userto}
          id='tocity'
          options={cityOptions.filter((city) => city.value !== userfrom?.value)}
          className='addcity2'
          isDisabled={!userfrom}
          onChange={handleToChange}
        />
      </div>
      <div className='updateflightclass'>
        <label className='updateflightlabel3'>Class :</label>
        <Select
          value={userflightClass}
          id='classflight'
          options={classOptions}
          className='flightclass'
          onChange={handleClassChange}
        />
      </div>
      <div className='updateflightprice'>
        <label className='updateflightlabel4'>Price :</label>
        <input
          type='number'
          placeholder='Enter Price'
          autoComplete='off'
          className='update-flightprice'
          value={userflightPrice}
          onChange={handlePriceChange}
        />
      </div>
      <button className='updateflight-btn' onClick={handleUpdate}>Update</button>
    </div>
  );
};
