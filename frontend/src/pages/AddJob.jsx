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
     
      <form onSubmit={openJobActions}>
      <h3>Add New Job</h3>
        <div class="form-outline mb-4">
          <input
            class="form-control"
            placeholder="Job Name"
            onChange={handleName}
            value={name}
          />
        </div>
        <div class="form-outline mb-4">
          <input
            class="form-control"
            placeholder="Description"
            onChange={handleDescription}
            value={description}
          />
        </div>
    <div class="row mb-4">
      <div class="col d-flex justify-content-center">
        <div class="form-check form-check-inline">
          <label class="form-label">
            <input
              class="form-check-input"
              type="radio"
              value="active"
              checked={active === 1}
              onChange={handleActive}
            />
            Active
          </label>
        </div>

        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="radio"
              value="inactive"
              checked={active === 0}
              onChange={handleActive}
            />
            Inactive
          </label>
        </div>
      </div>
    </div>

        <div class="text-center">
          <button type="submit" class="btn btn-dark btn-block mb-4">Add Job</button>
        </div>
    </form>
    </>
  );
};

export default AddJob;