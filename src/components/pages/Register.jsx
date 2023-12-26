import React from 'react';
import Reg from '../../Images/Reg.png';


export const Register = () => {
  return (
    <div className='RegPage'>
      <img src={Reg} alt='Reg Page' className='Reg' />
      <div className='RegForm'>
          <h1>Register</h1>
          <div className='RegContainer'>
            <input type='text' placeholder='Full Name' />
            <input type='text' placeholder='Phone Number' />
            <input type='text' placeholder='Email' />
            <input type='password' placeholder='Password' />
          </div>
          <button className='RegButton'>Register</button>
        </div>
    </div>
  );
};
