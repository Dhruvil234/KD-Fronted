import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

export const HolidayBookingPreview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedDate = location.state?.selectedDate || null;
    const holidayPackage = location.state?.holidayPackage || null;
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
      // Check if user details are available in local storage
      const storedUserName = localStorage.getItem('userFullName');
      const storedUserEmail = localStorage.getItem('userEmail');
      const token = localStorage.getItem('token');
  
      // If not available, redirect to register page
      if (!storedUserName || !storedUserEmail) {
        navigate('/register');
      } else {
        // Set user details for display
        setUserName(storedUserName);
        setUserEmail(storedUserEmail);
        if(!token){
          navigate('/Login');
        }
      }
    }, [navigate]);
    
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
        <h2 className='holidaybookinginfo1'>{holidayPackage?.holidayName}</h2>
        <p className='holidaybookinginfo2'>City: {holidayPackage?.city}</p>
        <p className='holidaybookinginfo2'>Duration: {holidayPackage?.duration}</p>
        <p className='holidaybookinginfo3'>Date of Travel: {selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'No date selected'}</p>
        <p className='holidaybookinginfo4'>Seller: {holidayPackage?.seller}</p>
        <p className='holidaybookinginfo5'>Service: {holidayPackage?.service}</p>
        <p className='holidaybookinginfo6'>Price:Rs. {holidayPackage?.price}/-</p>
        <p className='holidaybookinginfo7'>Name: {userName}</p>
        <p className='holidaybookinginfo8'>Email: {userEmail}</p>
        <button type='submit'onClick={handlebookholiday} className='holidaybookbtn' >Book Now</button>
    </div>
  )
}
