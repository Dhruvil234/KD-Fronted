import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className='mainfooterdiv'>
      <div className='foot'>
        <div className='column'>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
          </ul>
        </div>
        <div className='column'>
          <ul>
            <li>
              <NavLink to={"/flight"}>Flight</NavLink>
            </li>
            <li>
              <NavLink to={"/hotel"}>Hotel</NavLink>
            </li>
            <li>
              <NavLink to={"/packages"}>Packages</NavLink>
            </li>
          </ul>
        </div>
        <div className='column'>
          <ul>
            <li>
              <NavLink to={"/register"}>Register</NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          </ul>
        </div>
        <div className='column social-media'>
          <ul>
            <div>Follow us on:</div>
            <li>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <CiFacebook />
                 Facebook
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
                 Youtube
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                < FaSquareXTwitter />
                Twitter
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                < FaInstagram />
                Instagram
              </a>
            </li>
          </ul>
      </div>
    </div>
    <h4 style={{marginLeft:'270px',marginTop:'-1px',}}>Copyright © 2023 KD  Travellers Limited (formerly known as KD Travellers Private Limited), India. All rights reserved</h4>
  </div>
  );
};
