import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';  // Import Yup
import login from '../../Images/login.png';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const loginapi = 'http://localhost:8080/api/login';
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
    onSubmit: async (values, { setSubmitting ,resetForm}) => {
      console.log('Login Data:', values);
      toast.success("User Login Sucssesfully");
        
      if (values.email === 'admin@123.gmail.com' && values.password === 'Adm@12') {
        window.location.href = '/adminpage';
        return; 
      }
      try {
        // Simulating API call
        const response = await fetch(loginapi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const responseData = await response.json();
          alert(responseData.message);

          // Store token in local storage
          localStorage.setItem('token', responseData.token);

          // You can redirect the user or perform other actions as needed
          window.location.href = '/';
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }

      resetForm();
      setSubmitting(false);
      
    },
  });

  return (
    <div className='LoginPage'>
      <img src={login} alt='Login Page' className='loginImage' />
      <div className='loginForm'>
        <h1 className='tag'>Login</h1>
        <form onSubmit={formik.handleSubmit}>
            <input
              type='text'
              placeholder='Email'
              name='email'
              autoComplete='off'
              className={`input ${formik.touched.email && formik.errors.email ? '' : ''}`}
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
              className={`input ${formik.touched.password && formik.errors.password ? '' : ''}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='validation-text'>{formik.errors.password}</div>
            )}
          
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