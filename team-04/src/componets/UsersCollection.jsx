import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UsersProfile from "./UsersProfile";

const UserCollection = () => {
  const [usersArr, setUsersArr] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const fetchUsers = async () => {
      try {
        const usersData = await axios.get(
          "http://127.0.1:3000/users/allUsers",
          config
        );
        console.log("Here =>>>", usersData.data);
        const usersProfileCreation = usersData.data.userList.map((user, i) => {
          return (
            <div>
              <UsersProfile
                key={i}
                username={user.username}
                hourly_pay={user.hourly_pay}
                role={user.role}
                userId={user.id}
              />
            </div>
          );
        });
        setUsersArr(usersProfileCreation);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div class="container text-center">
        <div className="row row-cols-3">{usersArr}</div>
      </div>
    </>
  );
};

export default UserCollection;
