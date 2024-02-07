import React, { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik'; 
import * as Yup from 'yup'; 
import { toast } from 'react-toastify';

export const AddPackage = () => {
  const [fileInfo, setFileInfo] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); 
  const cities = [
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Hyderabad', label: 'Hyderabad' },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileInfo(file);
  };

  const formik = useFormik({
    initialValues: {
      holidayName: '',
      duration: '',
      city: '',
      service: '',
      price: '',
    },
    validationSchema: Yup.object({
      holidayName: Yup.string().trim().required('Holiday Name is required'),
      duration: Yup.string().trim().required('Duration is required'),
      city: Yup.string().trim().required('City is required'),
      service: Yup.string().trim().required('Service is required'),
      price: Yup.number().required('Price is required'),
    }),
    onSubmit: async (values,{ resetForm }) => {
      if (!fileInfo) {
        toast.error('Please choose a holiday image');
        return;
      }
    
      const formData = new FormData();
      formData.append('holidayImage', fileInfo);
      formData.append('holidayName', values.holidayName);
      formData.append('duration', values.duration);
      formData.append('city', values.city);
      formData.append('service', values.service);
      formData.append('price', values.price);
      console.log(formData)

      try {
        const response = await fetch('http://localhost:8080/api/addpackagedetails', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to add package');
        }

        toast.success('Package added successfully!');
        resetForm();
      } catch (error) {
        console.error('Error adding package:', error);
        alert('Failed to add package');
      }
    },
  });

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

  return (
    <div className='addpackagediv'>
      <h2 className='addpackagetag'>Add Package Details</h2>
      <form onSubmit={formik.handleSubmit}>
      <div className='holidayimagediv'>
          <label className='holidayimagelabel'>Holiday Image:</label>
          <input
              type="file"
              className='inputypefile'
              accept=".jpeg, .jpg, .png"
              onChange={handleFileChange}
          />
          {formik.touched.holidayImage && formik.errors.holidayImage ? (
          <div className='holidayimagevalidation'>{formik.errors.holidayImage}</div>    
          ) : (
          <div className='holidayimagevalidation'>{validateFileFormat(fileInfo)}</div>
          )}
        </div>
        <div className='holidaynamediv'>
          <label className='holidaynamelabel'>Holiday Name:</label>
          <input
            type="text"
            className='inputtypetext'
            placeholder="Enter Package Name"
            maxLength={25}
            {...formik.getFieldProps("holidayName")}
          />
        </div>
        {formik.touched.holidayName && formik.errors.holidayName ? (
            <div className='holidaynamevalidation'>{formik.errors.holidayName}</div>
          ) : null}
        <div className='holidaydurationdiv'>
          <label className='holidaydurationlabel'>Duration :</label>
          <input
            type="text"
            className='inputtypeduration'
            placeholder="1 Day / 1 Night"
            {...formik.getFieldProps("duration")}
          />
        </div>
        {formik.touched.duration && formik.errors.duration ? (
            <div className='holidaydurationvalidation'>{formik.errors.duration}</div>
          ) : null}
        <div className='holidaycitydiv'>
          <label className='holidaycitylabel'>City :</label>
          <Select
            id='city'
            name='city'
            className='holidaycityinput'
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
            <div className='holidaycityvalidation'>{formik.errors.city}</div>
          ) : null}
        <div className='holidayservicediv'>
          <label className='holidayservicelabel'>Service :</label>
          <input
            type="text"
            className='inputtypeservice'
            placeholder="Enter Service"
            maxLength={20}
            {...formik.getFieldProps("service")}
          />
        </div>
        {formik.touched.service && formik.errors.service ? (
            <div className='holidayservicevalidation'>{formik.errors.service}</div>
          ) : null}
        <div className="holidaypricediv">
          <label className="holidaypricelabel">Price :</label>
          <input
            type="number"
            placeholder="Enter Price"
            autoComplete="off"
            className="inputtypeforprice"
            {...formik.getFieldProps("price")}
          />
        </div>
        {formik.touched.price && formik.errors.price ? (
            <div className='holidayspricevalidation'>{formik.errors.price}</div>
          ) : null}
        <button type='submit' className='addpackage-button'>Add Package</button>
      </form>
    </div>
  );
};
