import React from 'react'
import { MdLocalHotel } from "react-icons/md";


export const AdminBookedHotelData = () => {
  return (
    <div>
      <h1 className='bookedhoteltag'>Booked Hotel Data <MdLocalHotel style={{marginBottom:'-5px',width:'58px',height:'35px'}}/></h1>
        <table className='bookedhotel-table'>
        <thead>
          <tr>
            <th>HotelName</th>
            <th>Rating</th>
            <th>City</th>
            <th>Seller</th>
            <th>Services</th>
            <th>Name</th>
            <th>Email</th>
            <th>Price</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
