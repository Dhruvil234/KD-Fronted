import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AdminContact from "./AdminContact";
import AdminDashboard from "./AdminDashboard"
import AdminBookedFlightData from "./AdminBookedFlightData";
import { AdminHotel } from "./AdminHotel";
import { Adminholiday } from "./Adminholiday";
import { AdminBookedHotelData } from "./AdminBookedHotelData";
import { AdminBookedHolidayData } from "./AdminBookedHolidayData";
import { IoIosContact } from "react-icons/io";


const API = import.meta.env.VITE_BACKENDAPI;
const getallflight = `${API}/api/getflights`;
let deleteflight = `${API}/api/deleteflight`;

export const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState(""); 
  const [showTable, setShowTable] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [showImage, setShowImage] = useState(true);  

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchFlightData();
  }, []);

  useEffect(() => {
    // If no option is selected, show the image
    if (!selectedOption) {
      setShowImage(true);
    } else {
      setShowImage(false);
    }
  }, [selectedOption]);


  const fetchFlightData = async () => {
    try {
      const response = await fetch(getallflight);
      const data = await response.json();
      setTableData(data.flights);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowTable(true);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this flight?");
    if (isConfirmed) {
      try {
        const response = await fetch(`${deleteflight}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete flight");
        }

        const data = await response.json();
        toast.success(data.message);
        fetchFlightData();
      } catch (error) {
        console.error("Error deleting flight:", error);
        alert("Failed to delete flight");
      }
    }
  };

  const handleUpdate = (flight) => {
    console.log("Selected Flight Data:", flight);
    navigate("/updateflight", {
      state: {
        id: flight._id,
        from: flight.from,
        to: flight.to,
        flightClass: flight.flightClass,
        price: flight.price,
      },
    });
  };

  const handleaddflight = () => {
    navigate("/addflight");
  };

  const renderTable = () => {
    if (!selectedOption && showImage) {
      return (
        <div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/admin-services-4500540-3804451.png"
            alt="No option selected"
            width={520}
            height={430}
            style={{marginTop:'10px',marginLeft:'350px'}}
          />
        </div>
      );
    }else if (selectedOption === "flight" && showTable) {
      return (
        <>
          <button
            type="button"
            className="addflightbtn"
            onClick={handleaddflight}
          >
            Add Flight
          </button>

          <table className="flight-table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Flight-Class</th>
                <th>Price</th>
                <th className="actionpanel">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((flight) => (
                <tr key={flight._id}>
                  <td>{flight.from}</td>
                  <td>{flight.to}</td>
                  <td>{flight.flightClass}</td>
                  <td>Rs.{flight.price}/-</td>
                  <td>
                    <button
                      type="submit"
                      className="updatebtn"
                      onClick={() => handleUpdate(flight)}
                    >
                      Update
                    </button>
                    <span className="button-spacing" />
                    <button
                      type="submit"
                      className="deletebtn"
                      onClick={() => handleDelete(flight._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (selectedOption === "contact" && showTable) { 
        return <AdminContact />;
    }else if (selectedOption === "bookedFlight" && showTable) { 
        return <AdminBookedFlightData />;
    }else if (selectedOption === 'dashboard' && showTable) {
        return <AdminDashboard />;
    }else if (selectedOption === 'hotel' && showTable) {
      return <AdminHotel />;
    }else if (selectedOption === 'holiday' && showTable) {
      return <Adminholiday />;
    }else if (selectedOption === 'bookedHotel' && showTable) {
      return <AdminBookedHotelData />;
    }else if (selectedOption === 'bookedPackage' && showTable) {
      return <AdminBookedHolidayData />;
    }
  };

  return (
    <>
      <hr style={{ borderColor: "blue" }} />
      <div className="adminpage">
        <div className="sidebar">
          <ul>
            <NavLink to={"/"}>
              {" "}
              <FaHome
                style={{
                  fontSize: "23px",
                  color: "blue",
                  marginLeft: "15px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              />
            </NavLink>{" "}
            <li>
                <button
                  type="submit"
                  className={`admindashboard ${
                    selectedOption === "dashboard" ? "selectedOption" : ""
                  }`}
                  onClick={() => handleOptionClick("dashboard")}
                >
                  DashBoard
                </button>
            </li>
            <li>
            <IoIosContact style={{width:'30px',height:'25px',marginBottom:'-5.3px',marginRight:'-60px',marginLeft:'53px',cursor:'pointer',}}/>
              <button
                type="submit"
                className={`admincontact ${
                  selectedOption === "contact" ? "selectedOption" : ""
                }`}
                onClick={() => handleOptionClick("contact")}
              >
                CRM 
              </button>
            </li>
            <li>
            <button
                type="submit"
                className={`adminflight ${
                  selectedOption === "flight" ? "selectedOption" : ""
                }`}
                onClick={() => handleOptionClick("flight")}
              >
                Flight
              </button>
              
            </li>
            <li>
           
                <button
                  type="submit"
                  className={`adminhotel ${
                    selectedOption === "hotel" ? "selectedOption" : ""
                  }`}
                  onClick={() => handleOptionClick("hotel")}
                >
                  Hotel
                </button>
                
            </li>
            <li>
              <button
                  type="submit"
                  className={`adminholiday ${
                    selectedOption === "holiday" ? "selectedOption" : ""
                  }`}
                  onClick={() => handleOptionClick("holiday")}
                >
                  Package
                </button>
               
            </li>
            <li>
                <button
                  type="submit"
                  className={`adminbookedflights ${
                    selectedOption === "bookedFlight" ? "selectedOption" : ""
                  }`}
                  onClick={() => handleOptionClick("bookedFlight")}
                >
                  Booked Flight
                </button>
              
            </li>
            <li>
                <button
                  type="submit"
                  className={`adminbookedhotel ${
                    selectedOption === "bookedHotel" ? "selectedOption" : ""
                  }`}
                  onClick={() => handleOptionClick("bookedHotel")}
                >
                  Booked Hotel
                </button>
            </li>
            <li>
                <button
                  type="submit"
                  className={`adminbookedpackage ${
                    selectedOption === "bookedPackage" ? "selectedOption" : ""
                  }`}
                  onClick={() => handleOptionClick("bookedPackage")}
                >
                  Booked Package
                </button>
            </li>
            
            {/* Add other buttons here */}
          </ul>
        </div>
        <div className="adminmaininfo">{renderTable()}</div>
      </div>
      <hr style={{ borderColor: "blue" }} />
    </>
  );
};

export default AdminPage;