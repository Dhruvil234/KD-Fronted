import React, { useState, useEffect } from 'react';
import { TbBeach } from "react-icons/tb";

const API = import.meta.env.VITE_BACKENDAPI;
const getallbookedpackage = `${API}/api/getallbookedpackage`;

export const AdminBookedHolidayData = () => {
  const [bookedData, setBookedData] = useState([]);

  useEffect(() => {
    const fetchBookedData = async () => {
      try {
        const response = await fetch(getallbookedpackage);
        const data = await response.json();
        setBookedData(data);
      } catch (error) {
        console.error('Error fetching booked data:', error);
      }
    };

    fetchBookedData();
  }, []);

  return (
    <div>
      <h1 className='bookedpackagetag'>Booked Holiday Data <TbBeach /></h1>
      <table className='bookedholiday-table'>
        <thead>
          <tr>
            <th>Holiday Name</th>
            <th>Duration</th>
            <th>City</th>
            <th>Seller</th>
            <th>Services</th>
            <th>Name</th>
            <th>Email</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookedData.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.holidayTitle}</td>
              <td>{booking.duration}</td>
              <td>{booking.city}</td>
              <td>{booking.seller}</td>
              <td>{booking.service}</td>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>Rs.{booking.price}/-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
