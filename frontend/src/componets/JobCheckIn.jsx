import { useState, useEffect } from "react";
import axios from "axios";

const JobCheckIn = (props) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [workTimeId, setWorkTimeId] = useState(0);
  const [checkOutStatus, setCheckOutStatus] = useState(false);

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

  // Load the checked-in state and workTimeId from localStorage on component mount
  useEffect(() => {
    const savedCheckedIn = localStorage.getItem(`checkedIn_${props.projectID}`);
    const savedWorkTimeId = localStorage.getItem(
      `workTimeId_${props.projectID}`
    );

    if (savedCheckedIn === "true") {
      setCheckedIn(true);
      setWorkTimeId(Number(savedWorkTimeId));
    }
  }, [props.projectID]);

  const sendStartTime = () => {
    setCheckOutStatus(false);
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

        console.log("response ===>>>", response);
        setWorkTimeId(response.data.workHoursId);

        // Save checked-in state and workTimeId to localStorage
        localStorage.setItem(`checkedIn_${props.projectID}`, "true");
        localStorage.setItem(
          `workTimeId_${props.projectID}`,
          String(response.data.workHoursId)
        );
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
        setCheckOutStatus(true);
        console.log("response ===>>>", response);

        // Clear checked-in state and workTimeId from localStorage when checking out
        localStorage.removeItem(`checkedIn_${props.projectID}`);
        localStorage.removeItem(`workTimeId_${props.projectID}`);
      })
      .catch((e) => {
        return console.log(e);
      });
  };

  const closeAlert = () => {
    setCheckOutStatus(false);
  };

  return (
    <div class="d-flex justify-content-around">
    {checkOutStatus && (
      <div className="alert alert-success" role="alert">
        Successfully logged hours
        <button
          type="button"
          className="btn-close"
          onClick={closeAlert}
        >
        </button>
      </div>
    )}
    <div class="p-2 flex-fill">
        <h6>{props.name}</h6>
        <p>{props.description}</p>
      </div>
      <div className="column">
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
      </div>
      </div>
);
      }
export default JobCheckIn;
