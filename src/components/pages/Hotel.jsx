import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { MdHotel } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

export const Hotel = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [counter,setCounter] = useState(1);
  const [childcounter,setchildcounter] = useState(1);
  const [roomcounter,setroomcounter] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState('');
  const navigate = useNavigate();

  const handlebookhotel = () => {
    navigate('/hotelpreview', { state: { selectedCheckinDate: formik.values.checkinDate,
                                        selectedCheckoutDate:formik.values.checkOutDate
                                       }});
  };

  const increment = () => {
    if (counter < 8) {
      setCounter((val) => val + 1);
    }
  };
  const decrement = () => {
    if (counter > 1) {
      setCounter((val) => val - 1);
    }
  };
  const childincrement = () => {
    if (childcounter < 4) {
      setchildcounter((val) => val + 1);
    }
  };
  const childdecrement = () => {
    if (childcounter > 1) {
      setchildcounter((val) => val - 1);
    }
  };
  const roomincrement = () => {
    if (roomcounter < 3) {
      setroomcounter((val) => val + 1);
    }
  };
  const roomdecrement = () => {
    if (roomcounter > 1) {
      setroomcounter((val) => val - 1);
    }
  };

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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayaftretomorrow = new Date();
  dayaftretomorrow.setDate(dayaftretomorrow.getDate()+2)

  const formik = useFormik({
    initialValues: {
      city: '',
      checkinDate: tomorrow,
      checkOutDate: dayaftretomorrow,
      adults: '1',
      children: '1',
      rooms: '1',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {                         
    console.log(`city: "${values.city}"`);               //https://img.freepik.com/free-photo/blur-hotel-room_74190-5745.jpg?w=996&t=st=1706090244~exp=1706090844~hmac=1cc438fc8fa33990d67ccb3adad8ad0969c5f3150110444a78cc2047c566189d
    setShowResults(true);                                //https://img.freepik.com/free-photo/blurred-double-bed_1203-120.jpg?w=996&t=st=1706090174~exp=1706090774~hmac=30c0734a953d01357f7886fe0f523348594f996eccbcd9445753897289cfb526
    setSelectedCityName(selectedCity ? selectedCity.label : '');                      
   },
  });
  const containerStyle = {
    backgroundImage: 'url("https://img.freepik.com/free-photo/blurred-double-bed_1203-120.jpg?w=996&t=st=1706090174~exp=1706090774~hmac=30c0734a953d01357f7886fe0f523348594f996eccbcd9445753897289cfb526")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1.5)',
  };

  return (
  <div className='randomhotel'>
      <div className='randomhotel_'>
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
            <p>Traveller :</p>
            <div className='adultcounter'>
              <p><FaUser /> Adult</p>
              <button type='button' className='adultdecrementbtn' onClick={decrement}><FaMinus /></button>
              {counter}
              <button type='button' className='adultincrementbtn' onClick={increment}><FaPlus /></button>
            </div>
            <div className='childcounter'>
              <p><MdFamilyRestroom /> Child</p>
              <button type='button' className='childdecrementbtn' onClick={childdecrement}><FaMinus /></button>
              {childcounter}
              <button type='button' className='childincrementbtn' onClick={childincrement}><FaPlus /></button>
            </div>
            <div className='roomcounter'>
              <p><MdHotel /> Room</p>
              <button type='button' className='roomdecrementbtn' onClick={roomdecrement}><FaMinus /></button>
              {roomcounter}
              <button type='button' className='roomincrementbtn' onClick={roomincrement}><FaPlus /></button>
            </div>
        </div>
        
        <button type='submit' className='hotelbookbtn'>
          Search Hotel
        </button>

        
      </div>
          </form>
      </div>
      <div className='randomhotelresult_'>
      {showResults && (
        <div className='hotelresults-container'>
          <div className='hotelresultimagecontainer'>
            <img src="/hotelimage.avif" alt='Place image' className='hotelImage' />
          </div>
          <div className='hotelresultinfo1'>
            <h3 className='hotelresulttag'>Taj Hotel</h3>
            <p className='hotelresultduration'>Rating : 4/5</p>
            <p className='hotelresultcity'>City Name : {selectedCityName}</p>
            <p className='hotelresultservice'>Service : Breakfast,Lunch,Dinner</p>
          </div>
          <div className='hotelresultinfo2'>
            <p className='hotelresultprice'>Price : 19,999/</p>
            <p className='hotelresultperperson'>*Per Person</p>
            <button type='submit' className='btnbookhotel' onClick={handlebookhotel}>
              Book Now
            </button>
          </div>
        </div>
      )}
      </div>
  </div> 
  );
};
