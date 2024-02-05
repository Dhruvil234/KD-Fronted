import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showTable, setShowTable] = useState(true);
  const [selectedbookedflights,setselectedbookedflight] = useState("")
  // const [showbookedflights,setshowbookedflights] = useState(true)

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || null;
  const to = location.state?.to || null;
  const flightclass = location.state?.flightClass || null;
  const flightpriceInput = location.state?.flightpriceInput || null;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowTable(true);
  };
  const handlebookedflights = (option) => {
    setselectedbookedflight(option);

  }

  const handleDelete = () => {
    const isConfirmed = window.confirm("This flight data will be deleted");
    if (isConfirmed) {
      setTableData((prevData) =>
        prevData.filter((item) => item.id !== "id")
      );
    }
  };

  const handleUpdate = () => {
    navigate("/updateflight", {
      state: {
        from,
        to,
        flightclass,
        flightpriceInput,
      },
    });
  };

  const handleaddflight = () => {
    navigate("/adminflight", {
      state: {
        existingData: {
          from: from?.label,
          to: to?.label,
          flightclass: flightclass?.label,
          flightpriceInput,
        },
      },
    });
  };

  const renderTable = () => {
    if (selectedOption === "flight" && showTable) {
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
              <tr key={"id"}>
                <td>{from?.label}</td>
                <td>{to?.label}</td>
                <td>{flightclass?.label}</td>
                <td>{flightpriceInput}</td>
                <td>
                  <button
                    type="submit"
                    className="updatebtn"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <span className="button-spacing" />
                  <button
                    type="submit"
                    className="deletebtn"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      );
    }
  };
  const bookedflighttable = () =>{
    if (selectedbookedflights === "bookedflight") {
      return (
      <>
          <h1>Booked Flights</h1>
      </>
    )}
  }

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
                  marginBottom: "25px",
                }}
              />
            </NavLink>
            <li>
              <button
                type="submit"
                className={`adminflight ${selectedOption === "flight" ? "selectedOption" : ""}`}
                onClick={() => handleOptionClick("flight")}>
                Flight
              </button>
            </li>
            <li>
              <button type="submit" className="adminhotel">
                Hotel
              </button>
            </li>
            <li>
              <button type="submit" className="adminpackage">
                Packages
              </button>
            </li>
            <li>
              <button type="submit" className="admincontact">
                Contact
              </button>
            </li>
            <li>
              <button type="submit" 
              // className="adminbookedflights" 
              className={`${selectedbookedflights === "bookedflight" ? "selectedbookedflights" : ""}`}
                onClick={() => handlebookedflights ("bookedflight")}>
                Booked Flight
              </button>
            </li>
          </ul>
        </div>
        <div className="adminmaininfo">{renderTable()}</div>
        <div className="bookedflightsinfo">{bookedflighttable()}</div>
      </div>
      <hr style={{ borderColor: "blue" }} />
    </>
  );
};

export default AdminPage;
