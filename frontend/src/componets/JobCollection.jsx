import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import JobProfile from "./JobProfile";

const JobCollection = (props) => {
  const [jobsArr, setJobsArr] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const fetchJobs = async () => {
      try {
        const jobsData = await axios.get(
          "http://127.0.1:3000/jobs/allJobs",
          config
        );
        console.log("Jobs Data", jobsData);
        const jobsProfileCreation = jobsData.data.jobs.map((job, i) => {
          return (
            <div key={i}>
              <div>
                <JobProfile
                  jobName={job.name}
                  jobDescription={job.description}
                  active={job.active}
                  jobId={job.id}
                  action={props.action}
                  currentUserId={props.currentUserId}
                />
              </div>
            </div>
          );
        });
        setJobsArr(jobsProfileCreation);
      } catch (e) {
        console.log(e);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="container text-center">
    <table className="table table-responsive table-hover">
        <thead className="table-light">
          <tr>
            <th>Job Name</th>
            <th>Description</th>
            <th>Active/Inactive</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
      <div>{jobsArr}</div>
      </tbody>
    </table>
    </div>
  );
};

export default JobCollection;
