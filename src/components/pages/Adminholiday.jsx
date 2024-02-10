import React,{ useEffect, useState }  from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_BACKENDAPI;
const getallholiday = `${API}/api/getallpackages`;
const deletepackage = `${API}/api/deletepackage`;

export const Adminholiday = () => {
  const [holidayPackages, setHolidayPackages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Fetch holiday packages data
    fetchHolidayPackages();
  }, []);

  const fetchHolidayPackages = async () => {
    try {
      const response = await fetch(getallholiday);
      if (!response.ok) {
        throw new Error('Failed to fetch holiday packages');
      }
      const data = await response.json();
      setHolidayPackages(data.holidayPackages);
    } catch (error) {
      console.error('Error fetching holiday packages:', error);
    }
  };

  const handlupdatebtn = (holidayPackage) => {
    navigate("/updatepackage", { state: { holidayPackage } });
    console.log("at upadate button"+ holidayPackage)
  }
  const handledeletebtn = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Package?');
    if (isConfirmed) {
      try {
        const response = await fetch(`${deletepackage}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete package');
        }
        // Refresh the list of holiday packages after deletion
        fetchHolidayPackages();
        console.log('Package deleted successfully!');
        toast.success("Package deleted successfully.");
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    }
  };

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
          {holidayPackages.map((holidayPackage) => (
            <tr key={holidayPackage._id}>
              <td><img src={holidayPackage.holidayImage} alt='Holiday' className='holiday-image' style={{ height: '70px', width: '70px',border:'1px solid #00B200',borderRadius:'7px' }} /></td>
              <td>{holidayPackage.holidayName}</td>
              <td>{holidayPackage.duration}</td>
              <td>{holidayPackage.city}</td>
              <td>{holidayPackage.service}</td>
              <td>Rs.{holidayPackage.price}/-</td>
              <td>
                <button className='holidayupdatebtn' onClick={() => handlupdatebtn(holidayPackage)}><HiPencilAlt style={{width:'25px',height:'22px',textAlign:'center'}} /></button>
                <button className='holidaydeletebtn' onClick={() => handledeletebtn(holidayPackage._id)}><MdDelete style={{width:'25px',height:'22px',textAlign:'center'}}/></button>
              </td>
            </tr>
          ))}
        </tbody>
        
        </table>
    </div>
  )
}
