import { Link } from "react-router-dom";

const UsersProfile = (props) => {
  console.log("USERPROFILE PROPS userId=>>> ", props.userId);
  const cardStyle = {
    maxWidth: "80%",
    textAlign: "center",
  };
  return (
    <>
      <div className="col-7" style={{ textAlign: "-webkit-center" }}>
        <Link
          to={`/admin/assignJob/${props.userId}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          Assign user to Job
        </Link>
        <Link
          to="/deleteUser"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Delete User
        </Link>
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">username: {props.username}</div>
          <div className="card-body">
            <p className="card-text">pay: ${props.hourly_pay}</p>
            <p className="card-text">role: {props.role}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersProfile;
