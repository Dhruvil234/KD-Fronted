import React from 'react'
import {  NavLink } from 'react-router-dom'
import "./Navbar.css"
import 'typeface-poppins';
import logo from '../Images/logo.png';
import { useState } from 'react';

export const Navbar = () => {
    const [isLoginActive, setIsLoginActive] = useState(false);

  const handleLoginClick = () => {
    setIsLoginActive(true);
  };

  const handleLinkClick = () => {
    setIsLoginActive(false);
  };
  return (
    <nav>
        <img src={logo} alt='KD Travels' className='logo'/>
      <ul>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/flight"}>Flight</NavLink>
            </li>
            <li>
                <NavLink to={"/hotel"}>Hotel</NavLink>
            </li>
            <li>
                <NavLink to={"/packages"}>Packages</NavLink>
            </li>
            <li>
                <NavLink to={"/register"}>Register</NavLink>
            </li>
            <li>
                <NavLink to={"/login"} className="login">Login</NavLink>
            </li>
        </ul>
        
    </nav>
  )
}
