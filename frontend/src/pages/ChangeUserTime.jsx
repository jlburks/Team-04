import { useParams } from "react-router-dom";
import axios from "axios";

const ChangeUserTime = () => {
  const { workday, userId, project_id } = useParams();
  const callApi = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .put(
        `http://127.0.0.1:3000/users/editTime/${userId}/${workday}/${project_id}`,
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <d1>Change User Time</d1>
      <h1>{workday}</h1>
      <h1>{userId}</h1>
      <h1>{project_id}</h1>
      <button onClick={callApi}>ring</button>
      <div>
        <h1>Start Time</h1>
        <input type="text" placeholder="YYYY" maxLength="4" />
        <span>:</span>
        <input type="text" placeholder="MM" maxLength="2" />
        <span>:</span>
        <input type="text" placeholder="DD" maxLength="2" />
        <span> </span>
        <input type="text" placeholder="HH" maxLength="2" />
        <span>:</span>
        <input type="text" placeholder="MM" maxLength="2" />
        <span>:</span>
        <input type="text" placeholder="SS" maxLength="2" />
      </div>
      <div>
        <h1>End Time</h1>
        <input type="text" placeholder="YYYY" maxLength="4" />
        <span>:</span>
        <input type="text" placeholder="MM" maxLength="2" />
        <span>:</span>
        <input type="text" placeholder="DD" maxLength="2" />
        <span> </span>
        <input type="text" placeholder="HH" maxLength="2" />
        <span>:</span>
        <input type="text" placeholder="MM" maxLength="2" />
        <span>:</span>
        <input type="text" placeholder="SS" maxLength="2" />
      </div>
    </>
  );
};

export default ChangeUserTime;
