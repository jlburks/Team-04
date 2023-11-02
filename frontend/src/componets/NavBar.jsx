import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const navbarClasses = props.isLoggedIn ? "navbar" : "navbar expanded-navbar";
  const Logout = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bs-side-navbar">
      <ul className="navbar-nav">
      <li><img
            className="logo"
            src="http://www.techprousa.com/wp-content/uploads/2015/08/logo.png"
            alt="TechPro Constructions"
          ></img></li>
        {props.isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Check-In/Out
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reports" className="nav-link">
                Reports
              </Link>
            </li>
          </>
        )}
        {props.isAdmin && (
          <li className="nav-item">
            <Link to="/admin/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        )}
        {props.isAdmin && (
          <li className="nav-item">
            <Link to="/admin/users" className="nav-link">
              Users
            </Link>
          </li>
        )}
      </ul>
      {props.isLoggedIn && (
        <button onClick={Logout} class="btn btn-danger">
          Logout
        </button>
      )}
    </nav>
  );
};

export default NavBar;
