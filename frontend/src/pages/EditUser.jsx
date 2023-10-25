import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditUser = (props) => {
  const { userId } = useParams();

  const [dUsername, setDUserName] = useState("");
  const [dPassword, setDPassword] = useState("");
  const [dHourlyPay, setDHourlyPay] = useState("");

  console.log("EDIT USER PROPS =>", userId);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hourly_pay, setHourlyPay] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`http://127.0.0.1:3000/users/getUser/${userId}`, config)
      .then((data) => {
        console.log(data.data.user[0]);
        const userInfo = data.data.user[0];
        setDUserName(userInfo.username);
        setDHourlyPay(userInfo.hourly_pay);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleUsername = () => {
    return;
  };
  const handlePassword = () => {
    return;
  };

  const handleHourlyPay = () => {
    return;
  };

  const handleAdmin = () => {
    return;
  };
  const handleUser = () => {
    return;
  };
  const addUserRequest = () => {
    return;
  };

  return (
    <>
      <h3>Add New User</h3>
      <div class="form-outline mb-4">
        <input
          class="form-control"
          placeholder={dUsername}
          onChange={handleUsername}
        />
      </div>

      <div class="form-outline mb-4">
        <input
          class="form-control"
          placeholder={dPassword}
          onChange={handlePassword}
        />
      </div>

      <div class="form-outline mb-4">
        <input
          class="form-control"
          placeholder={dHourlyPay}
          onChange={handleHourlyPay}
        />
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
        <button class="btn btn-dark btn-block mb-4" onClick={addUserRequest}>
          Add User
        </button>
      </div>
    </>
  );
};

export default EditUser;
