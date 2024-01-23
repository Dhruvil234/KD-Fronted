import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

export const Packages = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    city: Yup.string().required('City is required'),
  });

  const formik = useFormik({
    initialValues: {
      city: '',
      date: new Date(), 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(`city: "${values.city}"`);
      setShowResults(true);
    },
  });

  const handlebookholiday = () => {
    navigate('/holidaypreview', { state: { selectedDate: formik.values.date } });
  };

  const containerStyle = {
    backgroundImage: 'url("https://i0.wp.com/madhuonthego.com/wp-content/uploads/2023/12/Alleppey.jpg?fit=5477%2C3651&ssl=1")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1.5)',
  };

  const cities = [
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Hyderabad', label: 'Hyderabad' },
  ];

  return (
    <div className='packagediv' style={containerStyle}>
      <div className='packagedata'>     
        <form onSubmit={formik.handleSubmit}>
        <h2 className='pacakagtag'>Book Domestic Holiday Packages</h2>
        <div className='citydiv'>
          <label className='city'>Select City :</label>
          <Select
            id='city'
            name='city'
            className='selectcitytag'
            placeholder='Select City'
            options={cities}
            value={selectedCity}
            onChange={(selectedOption) => {
              formik.setFieldValue('city', selectedOption.value);
              setSelectedCity(selectedOption);
            }}
          />
        </div>
        {formik.touched.city && formik.errors.city ? (
          <div className='validationtext'>{formik.errors.city}</div>
        ) : null}

        <div className='form-group'>
          <label className='date'>Date of Travel :</label>
          <DatePicker
            id='date'
            name='date'
            className='datepicker'
            selected={formik.values.date} 
            onChange={(date) => formik.setFieldValue('date', date)}
            dateFormat='dd/MM/yyyy'
            placeholderText='Select Date'
            minDate={subDays(new Date(), -1)}
          />
          {formik.touched.date && formik.errors.date ? (
            <div className='validationtext'>{formik.errors.date}</div>
          ) : null}
        </div>

        <button type='submit' className='btnholiday'>
          Search Package
        </button>
      </form>
    </div>
 
      {showResults && (
        <div className='results-container'>
          <div className='resultimagecontainer'>
            <img src="/RedFort.png" alt='Place image' className='placeImage' />
          </div>
          <div className='resultinfo1'>
            <h3 className='resulttag'>Red Fort</h3>
            <p className='resultduration'>4 Night/5 Days</p>
            <p className='resultseller'>Seller : KD Travels</p>
            <p className='resultservice'>Service : Meals,Hotels,Transfer</p>
          </div>
          <div className='resultinfo2'>
            <p className='resultprice'>Price : 19,999/</p>
            <p className='resultperperson'>*Per Person</p>
            <button type='submit' onClick={handlebookholiday} className='btnbookholiday'>
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
