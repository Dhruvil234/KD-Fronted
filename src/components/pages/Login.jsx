import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';  // Import Yup
import login from '../../Images/login.png';
import { NavLink } from 'react-router-dom';

// Define validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting ,resetForm}) => {
      console.log('Login Data:', values);
      // Perform login or other actions here
      resetForm();
      setSubmitting(false); 
      
      
    },
  });

  return (
    <div className='LoginPage'>
      <img src={login} alt='Login Page' className='loginImage' />
      <div className='loginForm'>
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='inputContainer'>
            <input
              type='text'
              placeholder='Email'
              name='email'
              autoComplete='off'
              className={`input ${formik.touched.email && formik.errors.email ? 'error' : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='validation-text'>{formik.errors.email}</div>
            )}
            <input
              type='password'
              placeholder='Password'
              name='password'
              autoComplete='off'
              className={`input ${formik.touched.password && formik.errors.password ? 'error' : ''}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='validation-text'>{formik.errors.password}</div>
            )}
          </div>
          <div className='forgotPasswordLink'>
            <NavLink to='/Forgot-Password' style={{ color: 'blue', textDecoration: 'none' }}>
              Forgot Password
            </NavLink>
          </div>
          <button type='submit' className='loginButton'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
