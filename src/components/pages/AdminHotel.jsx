import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiPencilLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

const API = import.meta.env.VITE_BACKENDAPI;
const admingetallhotelapi = `${API}/api/gethoteldetails`;

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

  const handleAddHotel = () => {
    navigate('/addhotel');
  };

  const handleUpdateBtn = (hotel) => {
    console.log(hotel.hotelImage);
    navigate('/updatehotel', { state: { hotel } });
  };

  const handleDelete = async(hotelId) => {
=======
  const [hotelNameToUpdate, setHotelNameToUpdate] = useState('');

  const handleAddHotel = () => {
    navigate('/addhotel');
  }
  const handleUpdateBtn = (hotelName) => {
    setHotelNameToUpdate(hotelName);
    navigate('/updatehotel');
  }
  const handledelete = () =>{

    const isConfirmed = window.confirm('Are you sure you want to delete this Hotel?');
    if (isConfirmed) {
      try {
        const response = await fetch(`${API}/api/deletehotel/${hotelId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
          // Update the hotels state to reflect the deletion
          setHotels(hotels.filter(hotel => hotel._id !== hotelId));
          console.log('Hotel deleted successfully');
        } else {
          console.error('Failed to delete hotel:', data.message);
        }
      } catch (error) {
        console.error('Error deleting hotel:', error);
      }
    }
  };
  }
  return (
    <div>
      <button className='addhotelbtn' onClick={handleAddHotel}>Add Hotel</button>
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
                <button className='hoteldeletebtn' onClick={() => handleDelete(hotel._id)}><MdDeleteOutline style={{ width: '25px', height: '22px', textAlign: 'center' }} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </tbody>
    </table>
    </div>
  );
};
