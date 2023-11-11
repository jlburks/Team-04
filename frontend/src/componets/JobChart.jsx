import React, { useEffect, useState } from "react";

import JobChartRank from "../componets/JobChartRankList";

const JobChart = (props) => {
  const [selectActive, setSelectActive] = useState(1);
  const [currentJobNums, setCurrentJobNums] = useState([]);

  useEffect(() => {
    const selectedJob = props.data.data.overallGroupByCost.find(
      (job) => job.id == props.currentJob
    );
    console.log("Selected valueeeee", typeof selectedJob); //object
    setCurrentJobNums(selectedJob ? [selectedJob] : []);
  }, [props.currentJob]);

  const handleFilterJob = (e) => {
    console.log(Number(e.target.value));
    setSelectActive(Number(e.target.value));
  };
  const handleFilterAll = (e) => {
    console.log(Number(e.target.value));
    setSelectActive(Number(e.target.value));
  };

  return (
    <div>
      {props.currentJob == 0 ? (
        <div>
          <div className="btn-group">
            <label
              className={`btn btn-secondary ${
                selectActive === 1 ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="options"
                id="option1"
                autoComplete="off"
                value={1}
                onChange={handleFilterJob}
                defaultChecked
              />{" "}
              Active
            </label>
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="options"
                id="option2"
                value={0}
                autoComplete="off"
                onChange={handleFilterAll}
              />{" "}
              All
            </label>
          </div>
          <h1>All Jobs</h1>
          <h7>orderd by hours</h7>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Job Name</th>
                <th scope="col">Total Hours</th>
                <th scope="col">Total Cost</th>
                <th scope="col">Active</th>
              </tr>
            </thead>

            <tbody>
              {props.data.data.overallGroupByHours
                .filter((row) => {
                  // If selectActive is 0, no filtering needed
                  // If selectActive is 1, include rows where row.job_active is 1
                  return (
                    selectActive == 0 ||
                    (selectActive == 1 && row.job_active == 1)
                  );
                })
                .map((row, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.job_name}</td>
                    <td>{row.total_hours}</td>
                    <td>${Number(row.total_cost).toFixed(2)}</td>
                    <td>{row.job_active === 1 ? "Yes" : "No"}</td>
                  </tr>
                ))}
            </tbody>
            <br></br>
            <br></br>
            <h7>orderd by cost</h7>
            {/* <h1>orderd by cost</h1> */}
            <tbody>
              {props.data.data.overallGroupByCost
                .filter((row) => {
                  // If selectActive is 0, no filtering needed
                  // If selectActive is 1, include rows where row.job_active is 1
                  return (
                    selectActive == 0 ||
                    (selectActive == 1 && row.job_active == 1)
                  );
                })
                .map((row, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.job_name}</td>
                    <td>{row.total_hours}</td>
                    <td>${Number(row.total_cost).toFixed(2)}</td>
                    <td>{row.job_active === 1 ? "Yes" : "No"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <br></br>
          <div className="card">
            <div className="card-header">
              {currentJobNums.length > 0 && currentJobNums[0].job_name}
            </div>
            <div className="card-body">
              <h5 className="card-title">Reports</h5>
              <p className="card-text">
                {currentJobNums.length > 0 && currentJobNums[0].job_name}
              </p>
              <p className="card-text">
                Total # hours:{" "}
                {currentJobNums.length > 0 && currentJobNums[0].total_hours}
              </p>
              <p className="card-text">
                Total # cost: $
                {currentJobNums.length > 0 &&
                  Number(currentJobNums[0].total_cost).toFixed(2)}
              </p>
              <h5 className="card-title">Employees</h5>
              <div>
                <JobChartRank selectedJob={props.selectedJob} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobChart;
