import { Link } from "react-router-dom";

import UsersCollection from "../componets/UsersCollection.jsx";

const Users = () => {
  return (
    <>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Users"
        aria-label="Search"
      />
      <Link to="/addUser">Add User</Link>

      <UsersCollection />
    </>
  );
};

export default Users;
