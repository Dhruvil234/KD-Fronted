import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export const HolidayBookingPreview = () => {
    const navigate = useNavigate();

    const handlebookholiday = () => {
        navigate('/')
        toast.success("Package Booked Sucssesfully");
    }
    const containerStyle = {
        backgroundImage: 'url("https://img.freepik.com/free-photo/pouch-map-toy-airplane-blue-background-with-space-writing-text_23-2147958180.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
  return (
    <div className='holidaybookingpreview' style={containerStyle}>
        <h2 className='holidaybookingtag'>Holiday Booking Preview</h2>
          <h2 className='holidaybookinginfo1'>Gateway Of India</h2>
          <p className='holidaybookinginfo2'>4 Night/5 Days</p>
          <p className='holidaybookinginfo3'>Seller : KD Travels</p>
          <p className='holidaybookinginfo4'>Service : Meals,Hotels,Transfer</p>
          <p className='holidaybookinginfo5'>Price : 19,999/</p>
          <button type='submit'onClick={handlebookholiday} className='holidaybookbtn' >Book Now</button>

    </div>
  )
}
