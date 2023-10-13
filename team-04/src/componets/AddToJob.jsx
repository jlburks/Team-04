import axios from "axios";

const AddToJob = (props) => {
  console.log("TOKEN", localStorage.getItem("token"));

  console.log("ADDJOB =>>>", props);
  const buttonStyling = {
    color: "red",
    textSize: "font-size: 1.5rem",
  };

  const handleAddJobRequest = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `http://127.0.0.1:3000/jobs/addJob/${props.jobId}/${props.userId}`,
        config
      );
      console.log(response);
      if (response.status === 200 || response.status === 204) {
        console.log("job added to user");
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
        class="btn btn-primary"
        type="submit"
        onClick={handleAddJobRequest}
      >
        +
      </button>
    </>
  );
};

export default AddToJob;
