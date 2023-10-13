import axios from "axios";
import { useState } from "react";

const AddJob = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(0); // Initialize as 0 (inactive)

  const openJobActions = (e) => {
    e.preventDefault();
    console.log(name, description, active);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://127.0.1:3000/jobs/addJob",
        { name, description, active },
        config
      )
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      });
  };

  const handleName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };
  const handleActive = (e) => {
    console.log(e.target.value);
    setActive(e.target.value === "active" ? 1 : 0);
  };

  return (
    <>
      <h1>AddJob</h1>
      <div className="card text-white bg-primary mb-3">
        <div>
          <div className="card-header">
            <input placeholder="Job Name" onChange={handleName} />
          </div>
          <div className="card-body">
            <p className="card-text">
              <input placeholder="Description" onChange={handleDescription} />
            </p>
            <p className="card-text">
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={active === 1}
                  onChange={handleActive}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={active === 0}
                  onChange={handleActive}
                />
                Inactive
              </label>
            </p>
          </div>
          <button onClick={openJobActions}>Add Job</button>
        </div>
      </div>
    </>
  );
};

export default AddJob;
