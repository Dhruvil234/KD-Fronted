import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
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
              <NavLink to={"/Flight"}>Flight</NavLink>
            </li>
            <li>
              <NavLink to={"/Hotel"}>Hotel</NavLink>
            </li>
            <li>
              <NavLink to={"/Packages"}>Packages</NavLink>
            </li>
          </ul>
        </div>
        <div className='column'>
          <ul>
            <li>
              <NavLink to={"/Register"}>Register</NavLink>
            </li>
            <li>
              <NavLink to={"/Login"}>Login</NavLink>
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
  </>
  );
};
