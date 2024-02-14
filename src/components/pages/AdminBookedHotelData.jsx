import React, { useState, useEffect } from 'react';
import { MdLocalHotel } from "react-icons/md";

const API = import.meta.env.VITE_BACKENDAPI;
const getallbookedhotels = `${API}/api/getallbookedhotels`;

export const AdminBookedHotelData = () => {
  const [bookedHotels, setBookedHotels] = useState([]);

  useEffect(() => {
    fetch(getallbookedhotels)
      .then(response => response.json())
      .then(data => setBookedHotels(data))
      .catch(error => console.error('Error fetching booked hotels:', error));
  }, []);

  return (
    <div className='adminbookhotel'>
      <h1 className='bookedhoteltag'>Booked Hotel Data <MdLocalHotel style={{marginBottom:'-5px',width:'58px',height:'35px'}}/></h1>
      <table className='bookedhotel-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>HotelName</th>
            <th>City</th>
            <th>CheckInDate</th>
            <th>CheckOutDate</th>
             <th>Seller</th>
            <th>Price</th>
            <th>Adult</th>
            <th>Children</th>
            <th>hotelroom</th>
          </tr>
        </thead>
        <tbody>
          {bookedHotels.map(hotel => (
            <tr key={hotel._id}>
              <td>{hotel.name}</td>
              <td>{hotel.email}</td>
              <td>{hotel.hotelName}</td>
              <td>{hotel.city}</td>
              <td>{hotel.checkInDate}</td>
              <td>{hotel.checkOutDate}</td>
              <td>{hotel.seller}</td>
              <td>Rs.{hotel.price}/-</td>
              <td>{hotel.adult}</td>
              <td>{hotel.children}</td>
              <td>{hotel.hotelroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
