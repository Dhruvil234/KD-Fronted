import React from 'react';
import login from '../../Images/login.png';


export const Login = () => {
  return (
    <div className='LoginPage'>
      <img src={login} alt='Login Page' className='login' />
      <div className='loginForm'>
          <h1>Login</h1>
          <div className='inputContainer'>
            <input type='text' placeholder='Email' />
            <input type='password' placeholder='Password' />
          </div>
          <button className='loginButton'>Login</button>
        </div>
    </div>
  );
};
