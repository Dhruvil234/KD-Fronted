import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiPencilLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_BACKENDAPI;
const admingetallhotelapi = `${API}/api/gethoteldetails`;
const deletehotel = `${API}/api/deletehotel`;

export const AdminHotel = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(admingetallhotelapi);
        const data = await response.json();
        if (data.success) {
          setHotels(data.hotels);
        } else {
          console.error('Failed to fetch hotels:', data.message);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);


  const handleUpdateBtn = (hotel) => {
    navigate('/updatehotel', { state: { hotel } });
  };


  const handleAddHotel = () => {
    navigate('/addhotel');
  }

  const handledelete = async (hotelId) =>{

    const isConfirmed = window.confirm('Are you sure you want to delete this Hotel?');
    if (isConfirmed) {
      try {
        const response = await fetch(`${deletehotel}/${hotelId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
          setHotels(hotels.filter(hotel => hotel._id !== hotelId));
          console.log('Hotel deleted successfully');
          toast.success("Hotel deleted successfully");
        } else {
          console.error('Failed to delete hotel:', data.message);
        }
      } catch (error) {
        console.error('Error deleting hotel:', error);
      }
    }
  };
  return (
    <div>
      <button className='addhotelbtn' onClick={handleAddHotel}>Add Hotel </button>
      <table className='hotel-table'>
        <thead>
          <tr>
            <th>HotelImage</th>
            <th>HotelName</th>
            <th>Rating</th>
            <th>City</th>
            <th>Services</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel._id}>
              <td><img src={hotel.hotelImage} alt='Hotel Image' style={{ height: '70px', width: '70px', border: '1px solid #FF735C', borderRadius: '7px' }} /></td>
              <td>{hotel.hotelName}</td>
              <td>{hotel.rating}</td>
              <td>{hotel.city}</td>
              <td>{hotel.service}</td>
              <td>Rs.{hotel.price}/-</td>
              <td>
                <button className='hotelupdatebtn' onClick={() => handleUpdateBtn(hotel)}><RiPencilLine style={{ width: '25px', height: '22px', textAlign: 'center' }} /></button>
                <button className='hoteldeletebtn' onClick={() => handledelete(hotel._id)}><MdDeleteOutline style={{ width: '25px', height: '22px', textAlign: 'center' }} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
  
    </div>
  );
};
