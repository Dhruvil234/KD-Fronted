import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admindashboard');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="adflightdashboard">
        <h1>Flight Info</h1>
        <p>Total Flight Book: {dashboardData.totalFlightBook}</p>
        <p>Total Flight Booking Profit:Rs. {dashboardData.totalflightbookingprice}/-</p>
        <h2>
          Total Booking Based on class:
          <p>Economy: {dashboardData.totalEconomyBook}</p>
          <p>Premium Economy: {dashboardData.totalPremiumEconomyBook}</p>
          <p>Business: {dashboardData.totalBusinessBook}</p>
        </h2>
      </div>
      <div className="adhotelinfo">
        <h1>Hotel Info</h1>
        <p>Total Hotel Booking Profit:Rs. {dashboardData.totalHotelbookingPrice}/-</p>
        <h2>
          Total Hotel Book Per city:
          {Object.entries(dashboardData.totalBookedHotelsPerCity).map(([city, count]) => (
            <p key={city}>{city}: {count}</p>
          ))}
        </h2>
      </div>
      <div className="adholidayinfo">
        <h1>Holiday Info</h1>
        <p>Total Holiday Package Booking Profit:Rs. {dashboardData.totalHolidayBookingPrice}/-</p>
        <h2>
          Total Package Book Per city:
          {Object.entries(dashboardData.totalBookedHolidaysPerCity).map(([city, count]) => (
            <p key={city}>{city}: {count}</p>
          ))}
        </h2>
      </div>
    </>
  );
}

export default AdminDashboard;
