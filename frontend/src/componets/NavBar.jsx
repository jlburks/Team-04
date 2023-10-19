import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const navbarClasses = props.isLoggedIn ? "navbar" : "navbar expanded-navbar";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bs-side-navbar">
      <ul className="navbar-nav">
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
    </nav>
  );
};

export default NavBar;