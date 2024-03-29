import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import regImage from '../../Images/Reg.png';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_BACKENDAPI;
const passwordValidationRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&])(?=.*[0-9]).{6,}$/;
const apiUrl = `${API}/api/register`;

export const Register = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      password: '',
    },
    
    validationSchema: Yup.object().shape({
      fullName: Yup.string().min(3).max(35).required('Full Name is required'),
      mobileNumber: Yup.string().min(10).max(10).required('Phone Number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6).matches(passwordValidationRegex, 'Password must contain at least one uppercase letter, one special character (!@#$%^&), one digit, and be at least 6 characters long')
      .required('Password is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Create the data object in the required format
        const data = {
          fullName: values.fullName,
          mobileNumber: values.mobileNumber,
          email: values.email,
          password: values.password
        };

        // Make the API call with the modified data
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // Check if the request was successful
        if (response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          console.log(responseData);
          localStorage.setItem('userFullName', values.fullName);
          localStorage.setItem('userEmail', values.email);
          resetForm();
          window.location.href = '/login';
          
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
      console.log('Register data', values);
      toast.success("User Register Sucsessfully");
      resetForm();
      
    },
  });  

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='RegPage'>
        <img src={regImage} alt='Register Page' className='RegImage' />
        <div className='RegForm'>
          <h1>Register</h1>
          <div className='RegContainer'>
            <input
              type='text'
              placeholder='Full Name'
              name='fullName'
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete='off'
              className={formik.touched.fullName && formik.errors.fullName ? '' : ''}/>
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className='validation-text'>{formik.errors.fullName}</div>
            ) : null}

            <input
              type='text'
              placeholder='Phone Number'
              name='mobileNumber'
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete='off'
              className={formik.touched.mobileNumber && formik.errors.mobileNumber ? '' : ''}/>
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <div className='validation-text'>{formik.errors.mobileNumber}</div>
            ) : null}

            <input
              type='text'
              placeholder='Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete='off'
              className={formik.touched.email && formik.errors.email ? '' : ''}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='validation-text'>{formik.errors.email}</div>
            ) : null}

            <input
              type='password'
              placeholder='Password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete='off'
              className={formik.touched.password && formik.errors.password ? '' : ''}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='validation-text'>{formik.errors.password}</div>
            ) : null}
          </div>
          <button type='submit' className='RegButton'>
            Register
          </button>
        </div>
      </div>
    </form>
  );
};