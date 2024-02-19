import React, { useEffect, useRef, useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";
import Chart from "chart.js/auto";
import { FaChartLine } from "react-icons/fa";
import { BsFillPieChartFill } from "react-icons/bs";

const API = import.meta.env.VITE_BACKENDAPI;
const getadmindashboardapi = `${API}/api/admindashboard`;

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const flightChartRef = useRef(null);
  const hotelChartRef = useRef(null);
  const holidayChartRef = useRef(null);
  const profitChartRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(getadmindashboardapi)
      .then((response) => response.json())
      .then((data) => setDashboardData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Render charts when dashboardData is available
    if (dashboardData) {
      if (flightChartRef.current) {
        flightChartRef.current.destroy(); // Destroy existing flight chart
      }
      if (hotelChartRef.current) {
        hotelChartRef.current.destroy(); // Destroy existing hotel chart
      }
      if (holidayChartRef.current) {
        holidayChartRef.current.destroy(); // Destroy existing holiday chart
      }
      if (profitChartRef.current) {
        profitChartRef.current.destroy(); // Destroy existing profit chart
      }
      renderFlightChart();
      renderHotelChart();
      renderHolidayChart();
      renderProfitChart();
    }
  }, [dashboardData]);

  const renderFlightChart = () => {
    const ctx = document.getElementById("flightChart");
    flightChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Economy", "Premium Economy", "Business"],
        datasets: [
          {
            label: "Total Flight Bookings",
            data: [
              dashboardData.totalEconomyBook,
              dashboardData.totalPremiumEconomyBook,
              dashboardData.totalBusinessBook,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: 2000,
        },
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const renderHotelChart = () => {
    const ctx = document.getElementById("hotelChart");
    hotelChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(dashboardData.totalBookedHotelsPerCity),
        datasets: [
          {
            label: "Total Hotel Bookings",
            data: Object.values(dashboardData.totalBookedHotelsPerCity),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: 2000,
        },
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const renderHolidayChart = () => {
    const ctx = document.getElementById("holidayChart");
    holidayChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(dashboardData.totalBookedHolidaysPerCity).filter(
          (city) => city !== "undefined"
        ),
        datasets: [
          {
            label: "Total Package Bookings",
            data: Object.values(dashboardData.totalBookedHolidaysPerCity).filter(
              (city) => city !== "undefined"
            ),
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: 2000,
        },
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const renderProfitChart = () => {
    const ctx = document.getElementById("profitChart");
    const flightProfit = dashboardData.totalflightbookingprice || 0;
    const hotelProfit = dashboardData.totalHotelbookingPrice || 0;
    const holidayProfit = dashboardData.totalHolidayBookingPrice || 0;

    profitChartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Flight", "Hotel", "Holiday"],
        datasets: [
          {
            label: "Profit Distribution",
            data: [flightProfit, hotelProfit, holidayProfit],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: 2000,
        },
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });
  };

  return (
    <div className="dashboardparent">
    <div className="dashboarddiv">
      {dashboardData && (
        <div className="adflightdashboard" style={{boxShadow: '0 4px 8px rgba(0, 0, 255, 0.7)',}}>
          {/* Flight Info */}
          <h1 className="dashflighttag1">
            Flight Info <FaMoneyBillTrendUp style={{ marginLeft: "5px" }} />
          </h1>
          <p className="dashflighttag2">
            Total Flight Book: {dashboardData.totalFlightBook}
          </p>
          <p className="dashflighttag3">
            Total Flight Booking Profit: Rs.
            <span className="flightprofit">
              {dashboardData.totalflightbookingprice}/-
            </span>
          </p>
          <h2 className="dashflighttag4">
            Total Booking Based on class
            <p className="dashflighttag5">
              Economy: {dashboardData.totalEconomyBook}
            </p>
            <p className="dashflighttag6">
              Premium Economy: {dashboardData.totalPremiumEconomyBook}
            </p>
            <p className="dashflighttag7">
              Business: {dashboardData.totalBusinessBook}
            </p>
          </h2>
        </div>
      )}
      {dashboardData && (
        <div className="adhotelinfo"  style={{boxShadow: '0 4px 8px rgba(255, 115, 92, 0.7)',}}>
          {/* Hotel Info */}
          <h1 className="dashhoteltag1">
            Hotel Info <FaMoneyBillTransfer style={{ marginLeft: "5px" }} />
          </h1>
          <p className="dashhoteltag2">
            Total Hotel Booking Profit: Rs.
            {dashboardData.totalHotelbookingPrice}/-
          </p>
          <p className="dashhoteltag3">Total Hotel Book Per city</p>
          {Object.entries(dashboardData.totalBookedHotelsPerCity).map(
            ([city, count]) => (
              <p className="hotelcitytag" key={city}>
                {city}: {count}
              </p>
            )
          )}
        </div>
      )}
      {dashboardData && (
        <div className="adholidayinfo"  style={{boxShadow: '0 4px 8px rgba(0, 178, 0, 0.7)',}}>
          {/* Holiday Info */}
          <h1 className="dashholidaytag1">
            Holiday Info <TbBeach />
          </h1>
          <p className="dashholidaytag2">
            Total Holiday Package Booking Profit: Rs.
            {dashboardData.totalHolidayBookingPrice}/-
          </p>
          {Object.entries(dashboardData.totalBookedHolidaysPerCity)
            .filter(([city]) => city !== "undefined")
            .map(([city, count]) => (
              <p className="holidaycitytag" key={city}>
                {city}: {count}
              </p>
            ))}
        </div>
      )}
      </div>
      {/* Flight Chart */}
      <h2 style={{marginLeft:'540px',marginTop:'110px'}}>Booking Analysis <FaChartLine style={{marginBottom:'-5px',width:'50px'}}/></h2>
      <div className="dashboardchart">
              
      <div>
        <canvas id="flightChart" className="hotelchartdiv"></canvas>
      </div>
      {/* Hotel Chart */}
      <div >
        <canvas id="hotelChart" className="hotelchartdiv"></canvas>
      </div>
      {/* Holiday Chart */}
      <div >
        <canvas id="holidayChart" className="hotelchartdiv"></canvas>
      </div>
      </div>
      {/* Profit Chart */}
      <div className="dashboardpiechart">
        <h2 style={{marginLeft:'70px',}}>Bussiness Overview <BsFillPieChartFill  style={{marginBottom:'-5px',width:'50px'}}/></h2>
        <canvas id="profitChart"></canvas>
      </div>
    
    </div>
  );
}

export default AdminDashboard;