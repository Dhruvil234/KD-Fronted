import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';

export const Hotel = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const validationSchema = Yup.object({
    city: Yup.string().required('City is required'),
    checkinDate: Yup.date().required('Check-in date is required'),
    checkOutDate: Yup.date()
      .min(Yup.ref('checkinDate'), 'Check-out date must be after check-in date')
      .required('Check-out date is required'),
  });

  const cities = [
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Hyderabad', label: 'Hyderabad' },
  ];

  const adultoptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
  ];

  const childoptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];

  const roomoptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  const formik = useFormik({
    initialValues: {
      city: '',
      checkinDate: new Date(),
      checkOutDate: null,
      adults: '1',
      children: '1',
      rooms: '1',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(`city: "${values.city}"`);
    },
  });
  const containerStyle = {
    backgroundImage: 'url("https://seoimgak.mmtcdn.com/blog/sites/default/files/Hero_Image1_22.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1.5)',
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='hoteldiv' style={containerStyle}>
        <h3 className='hoteltag'>Book on India’s Largest Hotel Network</h3>
        <div className='hotelinfodata'>
          <label className='hotelcitylabel'>Select City :</label>
          <Select
            id='city'
            name='city'
            className='hotelcitydropdown'
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
          <div className='hotelvalidationcity'>{formik.errors.city}</div>
        ) : null}
        <div className='datesection'>
          <label className='checkindate'>Check-in:</label>
          <DatePicker
            id='checkinDate'
            name='checkinDate'
            className='datepicker'
            autoComplete='off'
            selected={formik.values.checkinDate}
            onChange={(date) => formik.setFieldValue('checkinDate', date)}
            dateFormat='dd/MM/yyyy'
            minDate={addDays(new Date(), 1)}
          />
          <label className='checkoutdate'>Check-out:</label>
          <DatePicker
            id='checkOutDate'
            name='checkOutDate'
            className='datepicker'
            autoComplete='off'
            selected={formik.values.checkOutDate}
            onChange={(date) => formik.setFieldValue('checkOutDate', date)}
            dateFormat='dd/MM/yyyy'
            minDate={formik.values.checkinDate ? addDays(formik.values.checkinDate, 1) : new Date()}
            disabled={!formik.values.checkinDate}
          />
        </div>
        <div className='hotelvalidationdiv'>
          {formik.touched.checkOutDate && formik.errors.checkOutDate ? (
           <div>{formik.errors.checkOutDate}</div>
          ) : null}
        </div>  
        <div className='hoteltravellerdiv'>
        
        </div>
        
        <button type='submit' className='hotelbookbtn'>
          Search Hotel
        </button>
      </div>
    </form>
  );
};
