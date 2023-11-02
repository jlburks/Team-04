import axios from "axios";
import { useState, useEffect } from "react";

const UserDropDown = (props) => {
  console.log("current props!!!");
  const [usersList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:3000/users/allUsers", config)
      .then((data) => {
        console.log(data.data.userList);
        setUserList(data.data.userList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleUserChange = (e) => {
    props.setUser(e.target.value);
  };

  return (
    <div>
      <select className="form-select" onChange={handleUserChange}>
        <option value={props.adminId}>Change User</option>
        {usersList.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <br />
    </div>
  );
};

export default UserDropDown;
