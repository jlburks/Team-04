import React, { useEffect, useState } from "react";

const JobChart = (props) => {
  const [jobName, setJobName] = useState(0);

  useEffect(() => {
    console.log("PROPSSSS ===", props.data.data.data);
    if (props.data.length === 0) {
      return;
    }
    if (jobName == 0) {
      return;
    }
    const index = props.data.data.jobChart.findIndex(
      (item) => item.project_id === num
    );

    // Extract the job name based on the found index
    const jobName = index !== -1 ? data[index].job_name : null;
    console.log("Job Name", jobName);
  }, []);

  return (
    <div>
      {jobName === 0 && <h1>All</h1>}
      {jobName > 0 && (
        <>
          {props.currentJob}
          {"Don't be afraid to make multiple API requests"}
          <h1>Name: {"hello"}</h1>
          <h1>Total Time:</h1>
          <h1>Total Pay:</h1>
          <h1>Team Members:</h1>
          <h1>Ordered List of top $$$ employees:</h1>
          <h1>Ordered List of top HOURS employees:</h1>
        </>
      )}
    </div>
  );
};

export default JobChart;
