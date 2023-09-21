import { useState, useEffect } from "react";
import axios from "axios";

const JobCheckIn = (props) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [workTimeId, setWorkTimeId] = useState(0);

  const currentTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  const sendStartTime = () => {
    const startTime = currentTime();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://127.0.0.1:3000/checkIn",
        { startTime: startTime, pId: props.projectID },
        config
      )
      .then((response) => {
        console.log(response.data.added);
        if (response.data.added === false) {
          console.log("error with your query");
        }
        setCheckedIn(true);
        console.log("hello");
        console.log("response ===>>>", response);
        setWorkTimeId(response.data.workHoursId);
      })
      .catch((e) => {
        return console.log(e);
      });
  };

  const sendEndTime = () => {
    const endTime = currentTime();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://127.0.0.1:3000/checkOut",
        { endTime: endTime, wTimeId: workTimeId },
        config
      )
      .then((response) => {
        if (response.data.added === false) {
          console.log("error with your query");
        }
        setCheckedIn(false);
        console.log("response ===>>>", response);
      })
      .catch((e) => {
        return console.log(e);
      });
  };

  return (
    <>
      <h2>{props.name}</h2>
      <h2>{props.key}</h2>
      <h3>{props.description}</h3>
      {checkedIn === false ? (
        <button
          type="button"
          className="btn btn-success"
          onClick={sendStartTime}
        >
          Check-In
        </button>
      ) : (
        <button type="button" className="btn btn-danger" onClick={sendEndTime}>
          Check-Out
        </button>
      )}
    </>
  );
};

export default JobCheckIn;
