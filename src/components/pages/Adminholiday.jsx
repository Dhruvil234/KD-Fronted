import React from 'react'

export const Adminholiday = () => {
  return (
    <div>
      <button className='addpackagebtn'>Add Package</button>
        <table className='holiday-table'>
        <thead>
          <tr>
            <th>HolidayImage</th>
            <th>HolidayName</th>
            <th>Duration</th>
            <th>City</th>
            <th>Services</th>
            <th>Price</th>
          </tr>
        </thead>
        </table>
    </div>
  )
}
