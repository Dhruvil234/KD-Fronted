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
                <NavLink to={"/Flight"}>Flight</NavLink>
            </li>
            <li>
                <NavLink to={"/Hotel"}>Hotel</NavLink>
            </li>
            <li>
                <NavLink to={"/Packages"}>Packages</NavLink>
            </li>
            <li>
                <NavLink to={"/Register"}>Register</NavLink>
            </li>
            <li>
                <NavLink to={"/Login"} className="login">Login</NavLink>
            </li>
        </ul>
        
    </nav>
  )
}
