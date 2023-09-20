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
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log("----", e));
  }, []);

  return <>{jobsArr}</>;
};

export default CheckInOut;
