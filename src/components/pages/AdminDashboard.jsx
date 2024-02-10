import React from 'react';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";

function AdminDashboard() {
  
  return (
    <div className='dashboarddiv'>
      <div className="adflightdashboard">
        <h1 className='dashflighttag1'>Flight Info <FaMoneyBillTrendUp style={{marginLeft:'5px',}} /></h1>
        <p className='dashflighttag2'>Total Flight Book :</p>
        <p className='dashflighttag3'>Total Flight Booking Profit:Rs.<span className='flightprofit'>999/-</span></p>
        <h2 className='dashflighttag4'>
          Total Booking Based on class
          <p className='dashflighttag5'>Economy :</p>
          <p className='dashflighttag6'>Premium Economy :</p>
          <p className='dashflighttag7'>Business :</p>
        </h2>
      </div>
      <div className="adhotelinfo">
        <h1 className='dashhoteltag1'>Hotel Info <FaMoneyBillTransfer style={{marginLeft:'5px',}} /></h1>
        <p className='dashhoteltag2'>Total Hotel Booking Profit:Rs.<span className='flightprofit'>999/-</span></p>
            <p className='dashhoteltag3'>Total Hotel Book Per city</p>
            <p className='dashhoteltag4'>Ahemedabad :</p>
            <p className='dashhoteltag5'>Delhi :</p>
            <p className='dashhoteltag6'>Mumbai :</p>
            <p className='dashhoteltag7'>Goa :</p>
            <p className='dashhoteltag8'>Hydrabad :</p>
         </div>
      <div className="adholidayinfo">
        <h1 className='dashholidaytag1'>Holiday Info <TbBeach /></h1>
        <p className='dashholidaytag2'>Total Holiday Package Booking Profit:Rs.<span className='holidayprofit'>999/-</span></p>
        <p className='dashholidaytag3'>Ahemedabad :</p>
          <p className='dashholidaytag4'>Delhi :</p>
          <p className='dashholidaytag5'>Mumbai :</p>
          <p className='dashholidaytag6'>Goa :</p>
          <p className='dashholidaytag7'>Hydrabad :</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
