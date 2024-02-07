import React from 'react'
import { TbBeach } from "react-icons/tb";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Logo from '../../Images/logo.png'

export const AdminBookedHolidayData = () => {

  const handlupdatebtn = () => {
    console.log('Data updated succesfully')
  }
  const handledeletebtn = () => {
    console.log('Data deleted succesfully')
  }

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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
        </tbody>
        </table>
    </div>
  )
}
