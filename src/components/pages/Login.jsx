import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';  // Import Yup
import login from '../../Images/login.png';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_BACKENDAPI;
const loginapi = `${API}/api/login`;

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
      
        
      if (values.email === import.meta.env.VITE_ADMIN_EMAIL && values.password === import.meta.env.VITE_ADMIN_PASSWORD) {
        localStorage.setItem('isAdmin','true');
        window.location.href = '/adminpage';
        return;
      }
      try {
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

          localStorage.setItem('token', responseData.token);
          console.log('Token set in local storage:', localStorage.getItem('token'));

          // Store token in local storage
          //localStorage.setItem('token', responseData.token);

         // Set timeout to remove token after 1 minute
      

          window.location.href = '/';
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
       toast.success("User Login Sucssesfully");
      resetForm();
      setSubmitting(false);
      
    },
  });

  setTimeout(() => {
    console.log('Removing token...');
    localStorage.removeItem('token');
  }, 30 * 60 * 1000); // 30 Minutes


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
            <div className='navforgotpassword'>
                <NavLink to='/Forgot-password'  style={{ color: 'blue', textDecoration: 'none' }}>
                  Forgot Password
                </NavLink>
            </div>
            <div className='navregister'>
                  <NavLink to='/Register'  style={{ color: 'blue', textDecoration: 'none' }}>
                    Register Your Self
                  </NavLink>
            </div>
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