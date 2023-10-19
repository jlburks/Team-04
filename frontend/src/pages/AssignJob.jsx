import React from "react";

import { useParams } from "react-router-dom";

import JobCollection from "../componets/JobCollection";

const AssignJob = (props) => {
  const { userId } = useParams();
  console.log("ASSIGN JOBS PARAMS====>>>", userId);
  return (
        <div className="container">
          <h3>Assign Job</h3>
          <form className="d-flex">
            <input
              className="form-control"
              type="search"
              placeholder="Search job"
              aria-label="Search"
            />
            <div className="col-auto">
            <button className="btn btn-dark" type="submit">
              Search
            </button>
            </div>
          </form>
          <JobCollection action="add" currentUserId={userId} />
        </div>
  );
};

export default AssignJob;
