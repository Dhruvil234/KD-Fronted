import React from 'react'
import { MdLocalHotel } from "react-icons/md";


export const AdminBookedHotelData = () => {
  return (
    <div>
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
            <th>Rating</th>
            <th>Services</th>
            <th>Price</th>
            <th>Adult</th>
            <th>Children</th>
            <th>hotelroom</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
