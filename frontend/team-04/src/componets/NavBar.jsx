import React from "react";
import { Link } from "react-router-dom";

// nav
const customCSS = `
  @media (min-width: 992px) {
    .navbar,
    .navbar-collapse {
      flex-direction: column;
    }
    .navbar-expand-lg .navbar-nav {
      flex-direction: column;
    }
    .navbar {
      width: 28%;
      height: 100vh;
      align-items: flex-start;
    }
    .navbar-brand {
      margin-left: 0.5em;
      padding-bottom: 0;
      border-bottom: 4px solid #464646;
    }
    form input {
      margin-bottom: 0.7em;
    }
  }
`;

const NavBar = (props) => {
  const navbarClasses = props.isLoggedIn ? "navbar" : "navbar expanded-navbar"; 

  return (
    <>
      <style>{customCSS}</style>
      
      <nav className="navbar navbar-expand-lg navbar-light bs-side-navbar" style={{ backgroundColor: "lightblue" }}>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" aria-orientation="vertical">
          {props.isLoggedIn && ( 
              <>
            <li className="nav-item">
              <a
                className="nav-link"
                id="v-pills-checkin/out-tab"
                data-toggle="pill"
                aria-current="page"
                href="#"
              >
                <Link to="/">Check-In/Out</Link>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="v-pills-reports-tab"
                data-toggle="pill"
                aria-current="page"
                href="#"
              >
                <Link to="/reports">Reports</Link>
              </a>
            </li>
          </>
          )}
            {props.isAdmin && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="v-pills-adminactions-tab"
                  data-toggle="pill"
                  aria-current="page"
                  href="#"
                >
                  <Link to="/adminActions">Admin Actions</Link>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
