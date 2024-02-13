import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { RiPencilLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import Logo from "../../Images/logo.png"

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
  const handledelete = () =>{
    const isConfirmed = window.confirm('Are you sure you want to delete this Hotel?');
    if (isConfirmed) {
      console.log("Delete Succssefully");
    }
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
          <tbody >
            <tr>
              <td><img src={Logo} alt='Hotel Image' style={{ height: '70px', width: '70px',border:'1px solid #FF735C',borderRadius:'7px' }}/></td>
              <td>Hotel Name</td>
              <td>4.5</td>
              <td>Delhi</td>
              <td>Free Wifi</td>
              <td>8999</td>
              <td>
                <button className='hotelupdatebtn' onClick={() => handleUpdateBtn('Hotel 1')}><RiPencilLine  style={{width:'25px',height:'22px',textAlign:'center'}} /></button>
                <button className='hoteldeletebtn' onClick={handledelete}><MdDeleteOutline  style={{width:'25px',height:'22px',textAlign:'center'}}/></button>
              </td>
            </tr>
      </tbody>
    </table>
    </div>
  )
}
