import axios from "axios";
import { useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditJob = (props) => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [curName, setcurName] = useState("");
  const [curDescription, setCurDescription] = useState("");
  const [curActive, setCurActive] = useState(0);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const getInfo = async () => {
      try {
        const currJobInfo = await axios.post(
          "http://127.0.0.1:3000/jobs/getJob",
          { jobId },
          config
        );
        const userCurrentInfo = currJobInfo.data.data[0];
        setcurName(userCurrentInfo.name);
        setCurDescription(userCurrentInfo.description);
        console.log("---", userCurrentInfo.active);
        setCurActive(userCurrentInfo.active);
      } catch (e) {}
    };
    getInfo();
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();

    // Check if name and description are empty, and use default values if they are
    const editedName = name === "" ? curName : name;
    const editedDescription = description === "" ? curDescription : description;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:3000/jobs/editJob",
        { name: editedName, description: editedDescription, active, jobId },
        config
      );
      navigate("/admin/Jobs");

      console.log("response =>", response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleActive = (e) => {
    console.log(e);
    console.log("active!!!", e.target.value);
    return setActive(e.target.value);
  };
  const handleDescription = (e) => {
    console.log(e.target.value);
    return setDescription(e.target.value);
  };
  const handleName = (e) => {
    console.log(e.target.value);
    return setName(e.target.value);
  };

  // console.log(jobId);
  console.log("curActive ==", curActive);

  return (
    <>
      <h1>Edit Information</h1>

      <form>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Name
          </label>
          <div class="col-sm-10">
            <input
              class="form-control"
              defaultValue={curName}
              onChange={handleName}
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">
            Description
          </label>
          <div class="col-sm-10">
            <input
              class="form-control"
              defaultValue={curDescription}
              onChange={handleDescription}
            />
          </div>
        </div>
        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
            <div class="col-sm-10">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value={1}
                  onClick={handleActive}
                  required
                />
                <label class="form-check-label" for="gridRadios1">
                  Active
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value={0}
                  onClick={handleActive}
                  required
                />
                <label class="form-check-label" for="gridRadios2">
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="form-check form-check-inline  d-flex justify-content-center">
          <div class="col-sm-10 d-flex justify-content-center">
            <button type="submit" class="btn btn-dark" onClick={handleChange}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditJob;
