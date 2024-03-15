import React, { useState, useEffect } from "react";
import WorkerCard from "./WorkerCard";
import "./PGListingPage.css";
// import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";

const apiUrl = `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1`;

const allWorkers = async () => {
    try {
      const response = await fetch(`${apiUrl}/worker`);    
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return {
        status: "requestFail",
        error: "Something Went Wrong.",
      };
    }
  };

const WorkersListingPage = () => {
  const [workersData, setWorkersData] = useState([]);
//   const [sortOption, setSortOption] = useState("ascending");
  useEffect(() => {
    async function populateAllWorkers(){
        const data = await allWorkers();
        setWorkersData(data.data.users)
    }
    populateAllWorkers();
  }, []);
//   const handleSort = (event) => {
//     const selectedOption = event.target.value;
//     setSortOption(selectedOption);
//     if (sortOption === "descending") {
//       setWorkersData([...workersData].sort((a, b) => a.minPrice - b.minPrice));
//     } else if (sortOption === "ascending") {
//       setWorkersData([...workersData].sort((a, b) => b.minPrice - a.minPrice));
//     }
//   };
  return (
    <>
      <div className="d-flex justify-content-center">
        {/* <div className="filersection">
          <Filters
            filters={filters}
            sortOption={sortOption}
            setSortOption={setSortOption}
            handleSort={handleSort}
          />
        </div> */}
        <div className="listings-section">
          {workersData.length > 0 && (
            <div className="pg-list">
              {workersData.map((pg) => (
                <WorkerCard key={pg._id} pg={pg} />
              ))}
            </div>
          )}
          {workersData.length === 0 && (
            <div className="d-flex">
              <div className="error-container">
                <div>
                  <p className="no-pg-error">Loading...</p>
                </div>
                <div>
                  <p className="home-link">
                    Go back to <Link to={"/"}>Home</Link> Page
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      </div>
    </>
  );
};

export default WorkersListingPage;
