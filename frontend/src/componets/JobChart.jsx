import React, { useEffect, useState } from "react";

const JobChart = (props) => {
  const [selectActive, setSelectActive] = useState(1);

  useEffect(() => {
    console.log("PROPS FOR JOBchart", props);
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
      <div className="form-check form-check-inline">
        <label class="form-check-label">
          <input
            type="radio"
            class="form-check-input"
            name="options"
            id="option1"
            autoComplete="off"
            value={1}
            onChange={handleFilterJob}
            defaultChecked
          />{" "}
          Active
        </label></div>
        <div className="form-check form-check-inline">
        <label class="form-check-label">
          <input
            type="radio"
            class="form-check-input"
            name="options"
            id="option2"
            value={0}
            autoComplete="off"
            onChange={handleFilterAll}
          />{" "}
          All
        </label>
      </div>
      {props.currentJob == 0 ? (
        <div>
          <h2>All Jobs</h2>
          <h7>Ordered by hours</h7>
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
            <h7>Ordered by cost</h7>
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
          <div class="card">
            <div class="card-header">Team Name</div>
            <div class="card-body">
              <h5 class="card-title">reports</h5>
              <p class="card-text">Job Name:</p>
              <p class="card-text">Total # hours:</p>
              <p class="card-text">Total # cost::</p>
              <h5 class="card-title">Employees</h5>
              <p class="card-text">
                orderd list of user with info like hours and money
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobChart;
