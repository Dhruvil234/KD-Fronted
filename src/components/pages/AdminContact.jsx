import React, { useState, useEffect } from 'react';

function AdminContact() {
  const dummyUsers = [
    {
      fullName: 'Mistry Dhruvil',
      mobileNumber: '8511017110',
      email: '21bcubs034@gmail.com',
    },
  ];

  const imageLinks = [
    'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?size=626&ext=jpg&ga=GA1.1.705780670.1703655392&semt=sph',
    'https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-with-backpack-his-back_1142-40542.jpg?size=626&ext=jpg&ga=GA1.1.705780670.1703655392&semt=sph',
    'https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?size=626&ext=jpg&ga=GA1.1.705780670.1703655392&semt=sph',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.705780670.1703655392&semt=sph'
  ];

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageLinks.length,0.5);
    setSelectedImage(imageLinks[randomIndex]);
  }, []);

  return (
    <div>
      <table className='contact-table'>
        <thead>
          <tr>
            <th>User</th>
            <th>Full Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <img src={selectedImage}  width='50px' height='40px' style={{borderRadius:'10px'}}/>
              </td>
              <td>{user.fullName}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.email}</td>
            </tr>
          ))}
          {dummyUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <img src={selectedImage}  width='50px' height='40px' style={{borderRadius:'8px'}}/>
              </td>
              <td>{user.fullName}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.email}</td>
            </tr>
          ))}
          {dummyUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <img src={selectedImage}  width='50px' height='40px' style={{borderRadius:'8px'}}/>
              </td>
              <td>{user.fullName}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.email}</td>
            </tr>
          ))}
          {dummyUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <img src={selectedImage}  width='50px' height='40px' style={{borderRadius:'8px'}}/>
              </td>
              <td>{user.fullName}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.email}</td>
            </tr>
          ))}
          {dummyUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <img src={selectedImage}  width='50px' height='40px' style={{borderRadius:'8px'}}/>
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
