import React from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Hotel } from './components/pages/Hotel'
import { Packages } from './components/pages/Packages'
import { Flight } from './components/pages/Flight'
import { Register } from './components/pages/Register'
import Login from './components/pages/Login'
import { Home } from './components/pages/Home'
import { ErrorPage } from './components/pages/ErrorPage'
import { Footer } from './components/pages/Footer'
import ForgotPassword from './components/pages/ForgotPassword'
import  ChangedPassword  from './components/pages/ChangedPassword'
import { AdminPage } from './components/pages/AdminPage';
import { FlightBookingPreview } from './components/pages/FlightBookingPreview'
import AdminRouteGuard from './components/pages/AdminRouteGuard'
import { HolidayBookingPreview } from './components/pages/HolidayBookingPreview'
import { Hotelpreview } from './components/pages/hotelpreview'
import  AdminFlight  from './components/pages/AddFlight'
import  {Updateflight}  from './components/pages/Updateflight'
import { AddPackage } from './components/pages/AddPackage'
import { UpdatePackage } from './components/pages/updatepackage'
import { AddHotel } from './components/pages/AddHotel'


function App() {

  return (
  <div className="App">
      <h2><Navbar/></h2>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Flight' element={<Flight/>}></Route>
        <Route path='/Hotel' element={<Hotel/>}></Route>
        <Route path='/Packages' element={<Packages/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/*' element={<ErrorPage/>}></Route>
        <Route path="/" exact component={Home} />
        <Route path="/errorpage" component={ErrorPage} />
        <Route path='/Forgot-password' element={<ForgotPassword />} />
        <Route path='/Change-password' element={<ChangedPassword />} />
        <Route path='/AdminPage' element={<AdminRouteGuard element={<AdminPage />} />} />
        <Route path='/flightpreview' element={<FlightBookingPreview/>}/>
        <Route path='/holidaypreview' element={<HolidayBookingPreview/>}/>
        <Route path='/hotelpreview' element={<Hotelpreview/>}/>
        <Route path='/addflight' element={<AdminFlight/>}/>
        <Route path='/updateflight' element={<Updateflight/>}/>
        <Route path='/addpackage' element={<AddPackage/>}/>
        <Route path='/updatepackage' element={<UpdatePackage/>}/>
        <Route path='/addhotel' element={<AddHotel/>}/>
        
      </Routes>
    <Footer/>
    
  </div>
  )
}
export default App
