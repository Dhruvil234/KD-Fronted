import React from 'react';
import page from '../../Images/page.png';
import { NavLink } from 'react-router-dom';
import { IoMdArrowRoundForward } from "react-icons/io";

export const ErrorPage = () => {
  return (
    <div>
        <img src={page} alt='KD Travels' className='page' />  
        <h3 className='errorpagetext'>Oops...Something Wrong Go Back To <IoMdArrowRoundForward style={{marginBottom:'-3.5px'}}/> <NavLink to="/" className='btn' style={{ color: 'blue', textDecoration: 'none',}}>Home</NavLink> </h3>
    </div> 
  )
}
                                                                                                                                                                                                             