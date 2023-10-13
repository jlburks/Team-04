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
      <h1>ADD USER</h1>
      <div className="card text-white bg-primary mb-3">
        <div>
          <div className="card-body">
            <p className="card-text">
              <input placeholder="Username" onChange={handleUsername} />
            </p>
            <p className="card-text">
              <input placeholder="Password" onChange={handlePassword} />
            </p>
            <p className="card-text">
              <input placeholder="Hourly Pay" onChange={handleHourlyPay} />
            </p>
            <p className="card-text">
              <label>
                <input
                  type="radio"
                  value="admin"
                  name="userType"
                  checked={role === "admin"} // Check if 'admin' is selected
                  onChange={handleAdmin}
                />
                admin
              </label>
              <label>
                <input
                  type="radio"
                  value="user"
                  name="userType"
                  checked={role === "user"} // Check if 'user' is selected
                  onChange={handleUser}
                />
                user
              </label>
            </p>
          </div>
          <button onClick={addUserRequest}>Add User</button>
        </div>
      </div>
    </>
  );
};

export default AddUser;
