import { useState } from "react";

import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginRequest = (e) => {
    e.preventDefault();
    const data = { username, password };
    axios
      .post("http://127.0.0.1:3000/login", data)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        props.setIsLoggedIn(data.data.login);
      })
      .catch((e) => {
        console.log("-----", e.response.data.error);
        if (e.response.data.error == "username not found") {
          setError("Incorrect Username");
        } else if (e.response.data.error == "incorect password") {
          setError("Incorrect Password");
        } else {
          console.log("error while logging in");
          return;
        }
      });
  };
  return (
    <>
      <h1>Login</h1>
      <form>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input className="form-control" onChange={handleUsername} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handlePassword}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={loginRequest}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
