import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

export const HolidayBookingPreview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedDate = location.state?.selectedDate || null;

    const handlebookholiday = () => {
        navigate('/')
        toast.success("Package Booked Sucssesfully");
    }
    
    const containerStyle = {
        backgroundImage: 'url("https://holidaypackages.yatra.com/media/test_module_1/2021/Aug/72d31d54a22713735e46135fcec834a6.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 1.5)',
      };
  return (
    <div className='holidaybookingpreview' style={containerStyle}>
        <h2 className='holidaybookingtag'>Holiday Booking Preview</h2>
          <h2 className='holidaybookinginfo1'>Red Fort</h2>
          <p className='holidaybookinginfo2'>Duration: 4 Night/5 Days</p>
          <p className='holidaybookinginfo3'>Date of Travel: {selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'No date selected'}</p>
          <p className='holidaybookinginfo4'>Seller : KD Travels</p>
          <p className='holidaybookinginfo5'>Service : Meals,Hotels,Transfer</p>
          <p className='holidaybookinginfo6'>Price : 19,999/</p>
          <p className='holidaybookinginfo7'>Name: Mistry Dhruvil </p>
          <p className='holidaybookinginfo8'>Email: 21bcubs@gmail.com</p>
          <button type='submit'onClick={handlebookholiday} className='holidaybookbtn' >Book Now</button>
    </div>
  )
}
