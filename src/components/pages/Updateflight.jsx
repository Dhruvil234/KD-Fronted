import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

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

  const [from, setFrom] = useState(location.state?.from || null);
  const [to, setTo] = useState(location.state?.to || null);
  const [flightClass, setFlightClass] = useState(location.state?.flightClass || null);
  const [flightPrice, setFlightPrice] = useState(location.state?.flightpriceInput || null);

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

  const handleUpdate = () => {
    console.log('Updated Values:', { from, to, flightClass, flightPrice });
    toast.success('Flight details updated successfully');
    navigate('/adminpage', {
      state: {
        from,
        to,
        flightClass,
        flightpriceInput:flightPrice,
      }
    });
  };
  
  useEffect(() => {
    setFrom(location.state?.from || cityOptions[0]);
    setTo(location.state?.to || cityOptions[0]);
    setFlightClass(location.state?.flightClass || classOptions[0]);
    setFlightPrice(location.state?.flightpriceInput || null);
  }, [location.state]);

  return (
    <div className='updateflightdiv'>
      <h3 className='updateflighttag'>Update Flight Details</h3>
      <div className='updateflightfrom'>
        <label className='updateflightlabel1'>Departure From :</label>
        <Select
          id='fromcity'
          options={cityOptions}
          className='addcity1'
          value={from}
          onChange={handleFromChange}
        />
      </div>
      <div className='updateflightto'>
        <label className='updateflightlabel2'>Departure To :</label>
        <Select
          id='tocity'
          options={cityOptions.filter((city) => city.value !== from?.value)}
          className='addcity2'
          value={to}
          isDisabled={!from}
          onChange={handleToChange}
        />
      </div>
      <div className='updateflightclass'>
        <label className='updateflightlabel3'>Class :</label>
        <Select
          id='classflight'
          options={classOptions}
          className='flightclass'
          value={flightClass}
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
          value={flightPrice}
          onChange={handlePriceChange}
        />
      </div>
      <button className='updateflight-btn'onClick={handleUpdate}>Update</button>
    </div>
  );
};
