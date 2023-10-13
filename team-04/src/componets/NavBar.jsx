import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const navBarStyle = {
    maxWidth: "100%", // Set the maximum width to 80%
    margin: "0 auto", // Center align the navbar
  };
  return (
    <ul className="nav nav-tabs" style={navBarStyle}>
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">
          <Link to="/">Check-In/Out</Link>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">
          <Link to="/reports">Reports</Link>
        </a>
      </li>
      {props.isAdmin && (
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            <Link to="/admin/jobs">Jobs</Link>
          </a>
        </li>
      )}
      {props.isAdmin && (
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            <Link to="/admin/users">Users</Link>
          </a>
        </li>
      )}
    </ul>
  );
};

export default NavBar;
