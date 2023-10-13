import React from "react";

import { useParams } from "react-router-dom";

import JobCollection from "../componets/JobCollection";

const AssignJob = (props) => {
  const { userId } = useParams();
  console.log("ASSIGN JOBS PARAMS====>>>", userId);
  return (
    <>
      <nav className="navbar-light bg-light">
        <div className="container">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <JobCollection action="add" currentUserId={userId} />
        </div>
      </nav>
    </>
  );
};

export default AssignJob;
