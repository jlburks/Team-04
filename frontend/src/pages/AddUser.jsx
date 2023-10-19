import axios from "axios";
import { useState } from "react";

const AddUser = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hourly_pay, setHourlyPay] = useState("");
  const [role, setRole] = useState("");

  const addUserRequest = (e) => {
    e.preventDefault();
    console.log(username, password, hourly_pay, role);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://127.0.1:3000/admin/addUser",
        { username, password, hourly_pay, role },
        config
      )
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUsername = (e) => {
    console.log(e.target.value);
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const handleHourlyPay = (e) => {
    console.log(e.target.value);
    setHourlyPay(e.target.value);
  };
  const handleUser = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  const handleAdmin = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  return (
    <>
      <h3>Add New User</h3>
          <div class="form-outline mb-4">
            <input 
              class="form-control" 
              placeholder="Username" 
              onChange={handleUsername} />
          </div>

          <div class="form-outline mb-4">
            <input 
              class="form-control" 
              placeholder="Password" 
              onChange={handlePassword} />
          </div>

          <div class="form-outline mb-4">
            <input 
              class="form-control"
              placeholder="Hourly Pay" 
              onChange={handleHourlyPay} />
          </div>

          <div class="row mb-4">
            <div class="col d-flex justify-content-center">
              <div class="form-check form-check-inline">
              <label class="form-label">
                <input
                  class="form-check-input"
                  type="radio"
                  value="admin"
                  name="userType"
                  checked={role === "admin"} // Check if 'admin' is selected
                  onChange={handleAdmin}
                />
                admin
              </label>
            </div>

            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="radio"
                  value="user"
                  name="userType"
                  checked={role === "user"} 
                  onChange={handleUser}
                />
                user
              </label>
              </div>
          </div>
        </div>
        <div class="text-center">
          <button 
            class="btn btn-dark btn-block mb-4"
            onClick={addUserRequest}>
            Add User
          </button>
        </div>
    </>
  );
};

export default AddUser;