import React from 'react';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";

function AdminDashboard() {
  
  return (
    <>
      <div className="adflightdashboard">
        <h1>Flight Info <FaMoneyBillTrendUp /></h1>
        <p>Total Flight Book: </p>
        <p>Total Flight Booking Profit:Rs./-</p>
        <h2>
          Total Booking Based on class:
          <p>Economy: </p>
          <p>Premium Economy: </p>
          <p>Business: </p>
        </h2>
      </div>
      <div className="adhotelinfo">
        <h1>Hotel Info <FaMoneyBillTransfer /></h1>
        <p>Total Hotel Booking Profit:Rs.-</p>
          Total Hotel Book Per city:
            <p>Ahemedabad</p>
            <p>Delhi</p>
            <p>Mumbai</p>
            <p>Goa</p>
            <p>Hydrabad</p>
         </div>
      <div className="adholidayinfo">
        <h1>Holiday Info <TbBeach /></h1>
        <p>Total Holiday Package Booking Profit:Rs. /-</p>
        <p>Ahemedabad</p>
          <p>Delhi</p>
          <p>Mumbai</p>
          <p>Goa</p>
          <p>Hydrabad</p>
      </div>
    </>
  );
}

export default AdminDashboard;
