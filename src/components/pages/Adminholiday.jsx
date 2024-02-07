import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Logo from '../../Images/logo.png'

export const Adminholiday = () => {

  const handlupdatebtn = () => {
    console.log('Data updated succesfully')
  }
  const handledeletebtn = () => {
    console.log('Data deleted succesfully')
  }

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
          <tbody>
          <td><img src={Logo} alt='Flight' className='flightimage'  style={{height:'60px',width:'60px'}}/></td>
            <td>Xyz </td>
            <td>2 Day / 1 Night</td>
            <td>Mumbai</td>
            <td>Meals,Wifi,Transport</td>
            <td>8999</td>
            <td>
              <button className='holidayupdatebtn' onClick={handlupdatebtn}><HiPencilAlt  style={{width:'25px',height:'22px',textAlign:'center'}}/></button>
              <button className='holidaydeletebtn' onClick={handledeletebtn}><MdDelete  style={{width:'25px',height:'22px',textAlign:'center'}}/></button>
            </td>
            </tbody>
        
        </table>
    </div>
  )
}
