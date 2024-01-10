import React from 'react'
import Travel from '../../Images/Travel.png';
import Flight from '../../Images/Flight.png';

export const Home = () => {
  console.log(import.meta.env); // Log the entire import.meta.env object
  console.log(import.meta.env.VITE_NAME);
  return (
    <div>
    <div className='homepage'>
        <img src={Travel} alt='Home Page' className='Travel' />
         <h1 className='tbb'>Travel Beyond Boundries</h1>
    </div>
  </div>
  )
}
