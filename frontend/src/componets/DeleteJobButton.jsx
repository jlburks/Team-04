import React from "react";

import axios from "axios";

import DeleteIcon from "../icons/trash.svg";

const DeleteJobButton = (props) => {
  const buttonStyling = {
    color: "red",
    textSize: "font-size: 1.5rem",
  };

  const handleDeleteRequest = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.delete(
        `http://127.0.0.1:3000/jobs/deleteJob/${props.jobId}`,
        config
      );
      if (response.status === 200 || response.status === 204) {
        console.log("Deletion Successful");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status (e.g., 4xx or 5xx)
        console.error("Request failed with status:", error.response.status);
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server:", error.request);
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={handleDeleteRequest}
      >
        <img src={DeleteIcon} alt="Edit Job" />
      </button>
    </>
  );
};

export default DeleteJobButton;