import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { RiPencilLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

export const AdminHotel = () => {
  const navigate = useNavigate();

  const [hotelNameToUpdate, setHotelNameToUpdate] = useState('');

  const handleAddHotel = () => {
    navigate('/addhotel');
  }

  const handleUpdateBtn = (hotelName) => {
    setHotelNameToUpdate(hotelName);
    navigate('/updatehotel');
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
            <tr>
              <td>Hotel Image</td>
              <td>Hotel Name</td>
              <td>4.5</td>
              <td>Delhi</td>
              <td>Free Wifi</td>
              <td>8999</td>
              <td>
                <button className='hotelupdatebtn'onClick={() => handleUpdateBtn('Hotel 1')}><RiPencilLine  style={{width:'25px',height:'22px',textAlign:'center'}} /></button>
                <button className='hoteldeletebtn' ><MdDeleteOutline  style={{width:'25px',height:'22px',textAlign:'center'}}/></button>
              </td>
            </tr>
            <tr>
              <td>Hotel Image</td>
              <td>Hotel Name</td>
              <td>4.5</td>
              <td>Delhi</td>
              <td>Free Wifi</td>
              <td>8999</td>
              <td>
                <button className='hotelupdatebtn' ><RiPencilLine  style={{width:'25px',height:'22px',textAlign:'center'}} /></button>
                <button className='hoteldeletebtn' ><MdDeleteOutline  style={{width:'25px',height:'22px',textAlign:'center'}}/></button>
              </td>
            </tr>
            <tr>
              <td>Hotel Image</td>
              <td>Hotel Name</td>
              <td>4.5</td>
              <td>Delhi</td>
              <td>Free Wifi</td>
              <td>8999</td>
              <td>
                <button className='hotelupdatebtn' ><RiPencilLine  style={{width:'25px',height:'22px',textAlign:'center'}} /></button>
                <button className='hoteldeletebtn' ><MdDeleteOutline  style={{width:'25px',height:'22px',textAlign:'center'}}/></button>
              </td>
            </tr>
            <tr>
              <td>Hotel Image</td>
              <td>Hotel Name</td>
              <td>4.5</td>
              <td>Delhi</td>
              <td>Free Wifi</td>
              <td>8999</td>
              <td>
                <button className='hotelupdatebtn' ><RiPencilLine  style={{width:'25px',height:'22px',textAlign:'center'}} /></button>
                <button className='hoteldeletebtn' ><MdDeleteOutline  style={{width:'25px',height:'22px',textAlign:'center'}}/></button>
              </td>
            </tr>
      </tbody>
    </table>
    </div>
  )
}
