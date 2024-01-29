import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

export const AdminPage = () => {
  return (
    <>
      <hr style={{ borderColor: 'blue'  }} />
    <div className='adminpage'>
      <div>
        <ul>
          <NavLink to={"/"} > <FaHome style={{ fontSize: '23px', color: 'blue', marginLeft:'15px', marginTop:'10px'}} /></NavLink>
            <li>
                <button type='submit' className="adminflight">Flight</button>
            </li>
            <li>
                <button type='submit' className="adminhotel">Hotel</button>
            </li>
            <li>
                <button type='submit'className="adminpackage">Packages</button>
            </li>
            <li>
                <button type='submit' className="admincontact">Contact</button>
            </li>
      </ul>
      </div>
   </div>
   <hr style={{ borderColor: 'blue'  }} />
   </>
  )
}
export default AdminPage;