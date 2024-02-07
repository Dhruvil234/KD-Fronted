import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Adminholiday = () => {

  const navigate = useNavigate();

  const handleaddpackage = () => {
    navigate('/addpackage')
 }

  return (
    <div>
      <button className='addpackagebtn' onClick={handleaddpackage}>Add Package</button>
        <table className='holiday-table'>
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
        </table>
    </div>
  )
}
