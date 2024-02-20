import React, { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik'; 
import * as Yup from 'yup'; 
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_BACKENDAPI;
const addhotelapi = `${API}/api/addhoteldetails`;

export const AddHotel = () => {
  const [fileInfo, setFileInfo] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); 
  const cities = [
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Hyderabad', label: 'Hyderabad' },
  ];

  const validateFileFormat = (file) => {
    if (file) {
      const validFormats = ['.jpeg', '.jpg', '.png'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (validFormats.includes(fileExtension)) {
        return file.name; 
      } else {
        return 'File format should be JPEG, JPG, or PNG';
      }
    }
    return '';
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileInfo(file);
  };

  const formik = useFormik({
    initialValues: {
      holidayName: '',
      rating: '',
      city: '',
      service: '',
      price: '',
    },
    validationSchema: Yup.object({
      holidayName: Yup.string().trim().required('Hotel Name is required'),
      rating: Yup.number()
        .min(0, 'Rating must be at least 0')
        .max(5, 'Rating must be at most 5')
        .required('Rating is required'),
      city: Yup.string().trim().required('City is required'),
      service: Yup.string().trim().required('Service is required'),
      price: Yup.number().required('Price is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('hotelImage', fileInfo);
      formData.append('hotelName', values.holidayName);
      formData.append('rating', values.rating);
      formData.append('city', values.city);
      formData.append('service', values.service);
      formData.append('price', values.price);
    
      try {
        const response = await fetch(addhotelapi, {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Failed to add hotel');
        }
    
        toast.success('Hotel added successfully!');
        Navigate("/adminpage");
        resetForm();
      } catch (error) {
        console.error('Error adding hotel:', error);
      }
    },      
  });
   
  return (
    <div className='addhoteldiv'>
      <h2 className='addhoteltag'>Add Hotel Details</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='hotelimagediv'>
          <label className='hotelimagelabel'>Holiday Image:</label>
          <input
              type="file"
              className='inputypefilehotel'
              accept=".jpeg, .jpg, .png"
              onChange={handleFileChange}
          />
        </div>
        {formik.touched.hotelImage && formik.errors.hotelImage ? (
            <div className='hotelimagevalidation'>{formik.errors.hotelImage}</div>    
          ) : (
            <div className='hotelimagevalidation'>{validateFileFormat(fileInfo)}</div>
          )}
        <div className='hotelnamediv'>
          <label className='hotelnamelabel'>Hotel Name:</label>
          <input
            type="text"
            className='inputtypetexthotel'
            placeholder="Enter Hotel Name"
            maxLength={25}
            {...formik.getFieldProps("holidayName")}
          />
        </div>
        {formik.touched.holidayName && formik.errors.holidayName ? (
            <div className='hotelnamevalidation'>{formik.errors.holidayName}</div>
          ) : null}
        <div className='hotelrattingdiv'>
          <label className='hotelrattinglabel'>Rating :</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className='inputtyperatting'
            placeholder="Enter Rating (0.0 - 5.0)"
            {...formik.getFieldProps("rating")}
          />
        </div>
        {formik.touched.rating && formik.errors.rating ? (
            <div className='hotelrattingvalidation'>{formik.errors.rating}</div>
          ) : null}
        <div className='hotelcitydiv'>
          <label className='hotelcitylabel'>City :</label>
          <Select
            id='city'
            name='city'
            className='hotelcityinput'
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
            <div className='hotelcityvalidation'>{formik.errors.city}</div>
          ) : null}
        <div className='hotelservicediv'>
          <label className='hotelservicelabel'>Service :</label>
          <input
            type="text"
            className='inputtypeservicehotel'
            placeholder="Enter Service"
            maxLength={20}
            {...formik.getFieldProps("service")}
          />
        </div>
        {formik.touched.service && formik.errors.service ? (
            <div className='hotelservicevalidation'>{formik.errors.service}</div>
          ) : null}
        <div className="hotelpricediv">
          <label className="hotelpricelabel">Price :</label>
          <input
            type="number"
            placeholder="Enter Price"
            autoComplete="off"
            className="inputtypeforpricehotel"
            {...formik.getFieldProps("price")}
          />
        </div>
        {formik.touched.price && formik.errors.price ? (
            <div className='hotelpricevalidation'>{formik.errors.price}</div>
          ) : null}
        <button type='submit' className='addhotel-button' >Add Hotel</button>
      </form>
    </div>
  )
}
