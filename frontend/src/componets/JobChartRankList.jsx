import { useState, useEffect } from "react";
import axios from "axios";

const JobCHartRankList = (props) => {
  const [hourList, setHourList] = useState([]);
  const [costList, setCostList] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(
        `http://127.0.0.1:3000/reports/UserJobsReport/${props.selectedJob}`,
        config
      )
      .then((response) => {
        // Handle the successful response here
        console.log("Data:", response.data);
        setCostList(response.data.jobSortCost);
        setHourList(response.data.jobSortHours);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, [props.selectedJob]);
  return (
    <div className="row">
      <div className="col">
        <h6>ranked by hours</h6>
        <ul className="list-group">
          {hourList.map((user, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{`${index + 1} Username: ${
                user.user_username
              }, Total Hours: ${user.total_hours}, Total Cost: ${
                user.total_cost
              }`}</span>
              <span className="badge badge-primary badge-pill">
                {user.total_hours}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col">
        <h6>ranked by cost</h6>
        <ul className="list-group">
          {hourList.map((user, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{`${index + 1} Username: ${
                user.user_username
              }, Total Hours: ${user.total_hours}, Total Cost: ${
                user.total_cost
              }`}</span>
              <span className="badge badge-primary badge-pill">
                {user.total_hours}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobCHartRankList;
