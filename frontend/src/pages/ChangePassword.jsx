import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = (props) => {
  const { userId } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("EDIT USER PROPS =>", userId);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const changePassword = () => {
    const data = {
      changedPassword: password,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .put(`http://127.0.0.1:3000/users/editPassword/${userId}`, data, config)
      .then((data) => {
        console.log(data);
        navigate("/admin/Users");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h3>Change Password</h3>

      <div class="form-outline mb-4">
        <input
          class="form-control"
          placeholder="type new password.."
          onChange={handlePassword}
        />
      </div>
      <div class="text-center">
        <button class="btn btn-dark btn-block mb-4" onClick={changePassword}>
          Change Password
        </button>
      </div>
    </>
  );
};

export default EditUser;
