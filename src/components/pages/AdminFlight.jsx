import React from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AdminFlight = () => {
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

  const navigate = useNavigate();
  
  const validationSchema = Yup.object().shape({
    departureCity: Yup.object().required('Departure city is required'),
    destinationCity: Yup.object().required('Destination city is required'),
    price: Yup.number().required('Price is required'),
  });

  const formik = useFormik({
    initialValues: {
      departureCity: null,
      destinationCity: null,
      flightClass: classOptions[0],
      price: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const newFlight = {
        from: values.departureCity.label,
        to: values.destinationCity.label,
        class: values.flightClass.label,
        price: values.price,
      };
      toast.success('Flight details added successfully');
      console.log('Flight Details:', newFlight);
      navigate('/adminpage',{ state: 
      { from: formik.values.departureCity,
        to: formik.values.destinationCity,
        flightClass: formik.values.flightClass,
        flightpriceInput: formik.values.price,
       }});
    },
  });

  return (
    <div className='adminflightdiv'>
      <h2 className='addflighttag'>Add Flight Detail</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='addflightfrom'>
          <label className='addflightlabel1'>Departure From :</label>
          <Select
            id='fromcity'
            options={cityOptions}
            className='addcity1'
            value={formik.values.departureCity}
            onChange={(selectedOption) => formik.setFieldValue('departureCity', selectedOption)}
          />
        </div>
          {formik.touched.departureCity && formik.errors.departureCity && (
            <div className='errorfrom'>{formik.errors.departureCity}</div>
          )}
        <div className='addflightto'>
          <label className='addflightlabel2'>Departure To :</label>
          <Select
            options={cityOptions.filter((city) => city.value !== formik.values.departureCity?.value)}
            className='addcity2'
            id='tocity'
            value={formik.values.destinationCity}
            onChange={(selectedOption) => formik.setFieldValue('destinationCity', selectedOption)}
            isDisabled={!formik.values.departureCity}
          />
        </div>
        {formik.touched.destinationCity && formik.errors.destinationCity && (
            <div className='errorto'>{formik.errors.destinationCity}</div>
          )}
        <div className='addflightclass'>
          <label className='addflightlabel3'>Class :</label>
          <Select
            id='classflight'
            options={classOptions}
            className='flightclass'
            value={formik.values.flightClass}
            onChange={(selectedOption) => formik.setFieldValue('flightClass', selectedOption)}
          />
        </div>
        <div className='addflightprice'>
          <label className='addflightlabel4'>Price :</label>
          <input
            type='number'  
            placeholder='Enter Price'
            autoComplete='off'
            className='custom-flightprice'  
            id='flightPriceInput'
            {...formik.getFieldProps('price')}
          />
        </div>
        {formik.touched.price && formik.errors.price && (
            <div className='priceerror'>{formik.errors.price}</div>
          )}
        <button type='submit' className='addflightbutton'>
          Add Flight
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminFlight;
