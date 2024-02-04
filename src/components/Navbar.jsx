import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import "typeface-poppins";
import logo from "../Images/logo.png";

export const Navbar = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );
  
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("token");

    // Update isLoggedIn state
    setIsLoggedIn(false);

    // Redirect to home page
    window.location.href = "/";
  };

  const handleLoginClick = () => {
    setIsLoginActive(true);
  };

  const handleLinkClick = () => {
    setIsLoginActive(false);
  };
  return (
    <nav>
      <img src={logo} alt="KD Travels" className="logo" />
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
        {!isLoggedIn && (
          <>
            <li>
              <NavLink to={"/Register"}>Register</NavLink>
            </li>
            <li>
              <NavLink to={"/Login"} className="login">
                Login
              </NavLink>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            {isAdmin && (
              <li>
                <NavLink to={"/Adminpage"}>Admin</NavLink>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="logout">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
