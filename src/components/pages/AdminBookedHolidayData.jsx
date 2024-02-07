import React from 'react'
import { TbBeach } from "react-icons/tb";

export const AdminBookedHolidayData = () => {
  return (
    <div>
      <h1 className='bookedpackagetag'>Booked Package Data <TbBeach /></h1>
       <table className='bookedholiday-table'>
        <thead>
          <tr>
            <th>HolidayImage</th>
            <th>HolidayName</th>
            <th>Duration</th>
            <th>City</th>
            <th>Services</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td>Xyz </td>
            <td>2 Day / 1 Night</td>
            <td>Mumbai</td>
            <td>Meals,Wifi,Transport</td>
            <td>8999</td>
          </tr>
          
        </tbody>
        </table>
    </div>
  )
}
