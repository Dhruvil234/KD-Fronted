import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

export const Packages = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showResults, setShowResults] = useState(false); 
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    city: Yup.string().required('Select City is required'),
    month: Yup.string().required('Select Month is required'),
  });

  const formik = useFormik({
    initialValues: {
      city: '',
      month: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle the search functionality here
      console.log('city:', values.city);
      // Set the state to show the results container
      setShowResults(true);
    },
  });

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const cities = [
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Hyderabad', label: 'Hyderabad' },
  ];

  const handlebookholiday = () => {
    navigate('/holidaypreview');
  }

  const containerStyle = {
    backgroundImage: 'url("https://www.sushanttravels.com/uploads/Z8e6r0b_amazing-2451315_1280.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className='packagediv' style={containerStyle}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className='pacakagtag'>Book Domestic Holiday Packages</h2>
        
        <label>Select City:</label>
        <Select
          id="city"
          name="city"
          className='selectcitytag'
          placeholder='Select City'
          options={cities}
          value={selectedCity}
          onChange={(selectedOption) => {
            formik.setFieldValue('city', selectedOption.value);
            setSelectedCity(selectedOption);
          }}
        />
        {formik.touched.city && formik.errors.city ? (
          <div className='validationtext'>{formik.errors.city}</div>
        ) : null}<br />

        <label htmlFor="month">Month of Travel:</label>
        <Select
          id="month"
          name="month"
          className='selectmonth'
          placeholder='Select Month'
          options={months.map(month => ({ value: month, label: month }))}
          value={selectedMonth}
          onChange={(selectedOption) => {
            formik.setFieldValue('month', selectedOption.value);
            setSelectedMonth(selectedOption);
          }}
        />
        {formik.touched.month && formik.errors.month ? (
          <div className='validationtext'>{formik.errors.month}</div>
        ) : null}<br />

        <button type="submit" className='btnholiday'>Search Package</button>
      </form>

      {showResults && (
        <div className='results-container'>
         <div className='resultinfo1'> 
          <h3 className='resulttag'>Kankaria Lake</h3>
          <p className='resultduration'>4 Night/5 Days</p>
          <p className='resultseller'>Seller : KD Travels</p>
          <p className='resultservice'>Service : Meals,Hotels,Transfer</p>
        </div>
        <div className='resultinfo2'>
          <p className='resultprice'>Price : 1,999/</p>
          <p className='resultperperson'>*Per Person</p>
          <button type='submit'onClick={handlebookholiday} className='btnbookholiday' >Book Now</button>
        </div>
        </div>
      )}
    </div>
  );
};
