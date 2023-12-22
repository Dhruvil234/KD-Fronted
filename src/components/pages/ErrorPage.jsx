import React from 'react';
import page from '../../Images/page.png';
import {  NavLink } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div>
        <img src={page} alt='KD Travels' className='page' />  
        <h3 className='text'>Oops...Something Wrong Go Back To <NavLink to="/" className='btn' style={{ color: 'blue', textDecoration: 'none' }}>Home</NavLink> </h3>
    </div> 
  )
}
                                                                                                                                                                                                             