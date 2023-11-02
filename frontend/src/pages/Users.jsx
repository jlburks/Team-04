import { Link } from "react-router-dom";
import UsersCollection from "../componets/UsersCollection.jsx";

const Users = () => {
  return (
    <form>
      <h1>Users</h1>
      <div class="d-flex align-items-center">
        <div className="col">
          <div class="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Username"
              aria-label="Search"
            />
            <div className="col-auto">
              <button type="button" class="btn btn-dark">
                Search
              </button>
            </div>

            <div className="col-auto ms-2">
              <Link to="/addUser">
                <button type="button" class="btn btn-dark">
                  Add User
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <UsersCollection />
    </form>
  );
};

export default Users;
