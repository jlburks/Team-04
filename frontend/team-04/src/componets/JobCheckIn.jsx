import { useState, useEffect } from "react";

const JobCheckIn = (props) => {
  const sendStartTime = () => {
    const currentDate = new Date();
    console.log(currentDate.getFullYear());
    console.log(currentDate.getMonth() + 1);
    console.log(currentDate.getDate());
    console.log(currentDate.getHours());
    console.log(currentDate.getMinutes());
    console.log(currentDate.getSeconds());
  };
  return (
    <>
      <h2>{props.name}</h2>
      <h3>{props.description}</h3>
      <button type="button" className="btn btn-success" onClick={sendStartTime}>
        Check-In
      </button>
    </>
  );
};

export default JobCheckIn;
