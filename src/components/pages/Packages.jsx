import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
const API = import.meta.env.VITE_BACKENDAPI;
const searchpackageapi = `${API}/api/getpackagesbycity`;

export const Packages = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [holidayPackages, setHolidayPackages] = useState([]);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    city: Yup.string().required('City is required'),
    date:Yup.date().min(new Date(), 'Departure date must be in the future').required('Departure date is required')
  });

  const formik = useFormik({
    initialValues: {
      city: '',
      date: new Date(), 
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(searchpackageapi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city: values.city,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);
        setHolidayPackages(responseData.holidayPackages);
        console.log(responseData.holidayPackages)

        setShowResults(true);
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Handle error as needed
      }


    
    },
  });

  const handlebookholiday = (selectedPackage) => {
    console.log('Selected Holiday Package Details:', {
      holidayName: selectedPackage.holidayName,
      duration: selectedPackage.duration,
      seller: 'KD TRAVELS',
      service: selectedPackage.service,
      price: selectedPackage.price,
      city: formik.values.city
    });
  
    navigate('/holidaypreview', {
      state: {
        selectedDate: formik.values.date,
        holidayPackage: {
          holidayName: selectedPackage.holidayName,
          duration: selectedPackage.duration,
          seller: 'KD TRAVELS',
          service: selectedPackage.service,
          price: selectedPackage.price,
          city: formik.values.city
        }
      }
    });
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
  <div className='random'>
      <div className='packagediv' style={containerStyle}>
      <div className='packagedata'>     
        <form onSubmit={formik.handleSubmit}>
        <h2 className='pacakagtag'>Book Domestic Holiday Packages</h2>
        <div className='citydiv'>
          <label className='city'>Select City :</label>
          <Select
            id='city'
            name='city'
            className='packagecitytag'
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
      </div>
      <div className='random_'>
        {/* Package display based on response   */}
        {showResults && (
          <div className='results-container'>
          {holidayPackages.map((holidayPackage) => (
            <div key={holidayPackage._id} className='resultItem'>
              <div className='resultimagecontainer'>
                <img src={holidayPackage.holidayImage} alt='Holiday Package' className='placeImage' />
              </div>
              <div className='resultinfo1'>
                <h3 className='resulttag'>{holidayPackage.holidayName}</h3>
                <p className='resultduration'>{holidayPackage.duration}</p>
                <p className='resultduration'>Seller:KD TRAVELS</p>
                <p className='resultseller'>Service : {holidayPackage.service}</p>
              </div>
              <div className='resultinfo2'>
                <p className='resultprice'>Price : Rs.{holidayPackage.price}/-<br/>*per person</p>
                <button type='button' onClick={() => handlebookholiday(holidayPackage)}className='btnbookholiday'>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
  </div>
);
};
