import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <ul className="nav nav-tabs">
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
            <Link to="/adminActions">Admin Actions</Link>
          </a>
        </li>
      )}
    </ul>
  );
};

export default NavBar;
