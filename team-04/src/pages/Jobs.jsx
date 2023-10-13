import React from "react";
import JobCollection from "../componets/JobCollection";

import { Link } from "react-router-dom";

const Jobs = () => {
  return (
    <>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>

      <Link to="/addJob" style={{ display: "flex", justifyContent: "center" }}>
        Add new Job
      </Link>

      <JobCollection action="delete" />
    </>
  );
};

export default Jobs;
