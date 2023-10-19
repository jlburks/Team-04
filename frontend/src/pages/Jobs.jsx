import React from "react";
import JobCollection from "../componets/JobCollection";

import { Link } from "react-router-dom";

const Jobs = () => {
  return (
    <form>
      <h1>Jobs</h1>
      <div class="d-flex align-items-center">
      <div className="col">
        <div class="input-group">
        <input
          className="form-control"
          type="search"
          placeholder="Job name"
          aria-label="Search"
        />

        <div className="col-auto">
        <button type="button" class="btn btn-dark">Search
        </button>
        </div>


        <div className="col-auto ms-2">
        <Link to="/addJob">
          <button type="button" class="btn btn-dark">
            Add new Job
          </button>
        </Link>
        </div>
      </div>
      </div>
      </div>

      <JobCollection action="delete" />
    </form>
  );
};

export default Jobs;