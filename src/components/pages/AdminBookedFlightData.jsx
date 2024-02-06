import React, { useState, useEffect } from 'react';
import { MdFlightTakeoff } from "react-icons/md";

const API = import.meta.env.VITE_BACKENDAPI;
const adminbookeflightdataapi = `${API}/api/getallbookedflightdata`;

function AdminBookedFlightData() {
  const [bookedFlights, setBookedFlights] = useState([]);

  useEffect(() => {
    fetchBookedFlightData();
  }, []);

  const fetchBookedFlightData = async () => {
    try {
      const response = await fetch(adminbookeflightdataapi);
      const data = await response.json();
      if (data.success) {
        setBookedFlights(data.bookedFlights);
      } else {
        console.error('Failed to fetch booked flight data');
      }
    } catch (error) {
      console.error('Error fetching booked flight data:', error);
    }
  };

  return (
    <div>
      <h1 style={{marginLeft:"360px"}}>Booked Flight Data <MdFlightTakeoff style={{marginBottom:'-5px',marginLeft:'10px',width:'48px'}}/></h1>
      <table className="flight-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Flight-Class</th>
            <th>Price</th>
            <th>Seat</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookedFlights.map((flight) => (
            <tr key={flight._id}>
              <td>{flight.from}</td>
              <td>{flight.to}</td>
              <td>{flight.flightClass}</td>
              <td>Rs.{flight.price}/-</td>
              <td>{flight.seat}</td>
              <td>{flight.name}</td>
              <td>{flight.email}</td>
              <td>{flight.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookedFlightData;
