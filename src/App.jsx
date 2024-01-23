import React from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Hotel } from './components/pages/Hotel'
import { Packages } from './components/pages/Packages'
import { Flight } from './components/pages/Flight'
import { Register } from './components/pages/Register'
import Login from './components/pages/Login'; 
import { Home } from './components/pages/Home'
import { ErrorPage } from './components/pages/ErrorPage'
import { Footer } from './components/pages/Footer'
import ForgotPassword from './components/pages/ForgotPassword'
import  ChangedPassword  from './components/pages/ChangedPassword'
import AdminPage from './components/pages/adminpage';
import { FlightBookingPreview } from './components/pages/FlightBookingPreview'
import AdminRouteGuard from './components/pages/AdminRouteGuard'
import { HolidayBookingPreview } from './components/pages/HolidayBookingPreview'

function App() {

  return (
  <div className="App">
      <h2><Navbar/></h2>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/flight' element={<Flight/>}></Route>
        <Route path='/hotel' element={<Hotel/>}></Route>
        <Route path='/packages' element={<Packages/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/*' element={<ErrorPage/>}></Route>
        <Route path="/" exact component={Home} />
        <Route path="/errorpage" component={ErrorPage} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/change-password' element={<ChangedPassword />} />
        <Route path='/adminPage' element={<AdminRouteGuard element={<AdminPage />} />} />
        <Route path='/flightpreview' element={<FlightBookingPreview/>}/>
        <Route path='/holidaypreview' element={<HolidayBookingPreview/>}/>




      </Routes>
    <Footer/>
    
  </div>
  )
}
export default App
