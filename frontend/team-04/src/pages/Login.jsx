import { useState } from "react";

import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        console.log(data.data.token);
        props.setIsLoggedIn(data.data.login);
      })
      .catch((e) => {
        console.log("-----", e);
      });
  };
  return (
    <>
      <h1>Login</h1>
      <form>
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
