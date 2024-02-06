import React, { useState, useEffect } from 'react';

const API = import.meta.env.VITE_BACKENDAPI;
const getallregisteruser = `${API}/api/getallregisteruser`;

function AdminContact() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(getallregisteruser);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const getRandomImage = () => {
    const imageLinks = [
      'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?size=626&ext=jpg&ga=GA1.1.705780670.1703655392&semt=sph',
      'https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-with-backpack-his-back_1142-40542.jpg?size=626&ext=jpg&ga=GA1.1.705780670.1703655392&semt=sph',
      'https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?size=626&ext=jpg&ga=GA1.1.705780670.1703655392&semt=sph',
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.705780670.1703655392&semt=sph'
    ];
    const randomIndex = Math.floor(Math.random() * imageLinks.length);
    return imageLinks[randomIndex];
  };

  return (
    <div>
      <table className='contact-table'>
        <thead>
          <tr>
            <th>User No.</th>
            <th>User</th>
            <th>Full Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <img src={getRandomImage()} width='50px' height='40px' style={{ borderRadius: '10px' }} />
              </td>
              <td>{user.fullName}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminContact;
