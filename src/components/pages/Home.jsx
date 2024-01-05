import React from 'react'
import Travel from '../../Images/Travel.png';
import Flight from '../../Images/Flight.png';

export const Home = () => {
  return (
    <div>
    <div className='homepage'>
        <img src={Travel} alt='Home Page' className='Travel' />
         <h1 className='tbb'>Travel Beyond Boundries</h1>
    </div>
  </div>
  )
}
