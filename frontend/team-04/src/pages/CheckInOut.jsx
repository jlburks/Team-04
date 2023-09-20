import { useState, useEffect } from "react";

import axios from "axios";

import JobCheckIn from "../componets/JobCheckIn";

const CheckInOut = () => {
  const [jobsArr, setJobsArr] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:3000/jobs", config)
      .then((response) => {
        console.log(response);
        setJobsArr(response.data.jobs);
      })
      .catch((e) => console.log("----", e));
  }, []);

  return (
    <>
      {jobsArr.length > 0 ? (
        jobsArr.map((job) => {
          return (
            <JobCheckIn
              key={job.project_id}
              projectID={job.project_id}
              workHourId={job.workHourId}
              name={job.name}
              description={job.description}
            />
          );
        })
      ) : (
        <h1>No Jobs found</h1>
      )}
    </>
  );
};

export default CheckInOut;
