import { Link } from "react-router-dom";
import EditIcon from "../icons/edit.svg";
import TrashIcon from "../icons/trash.svg";

const UsersProfile = (props) => {
  console.log("PROPS userId=>>> ", props.userId);
  return (
    <div>
      <tr className="hoverable-row">
      <td>{props.username}</td>
      <td>{props.hourly_pay}</td>
      <td>{props.role}</td>
      <td>
        <Link to={`/admin/assignJob/${props.userId}`}>
        <button type="button" class="btn">
        <img src={EditIcon} alt="Edit User" />         
        </button>
        </Link>
      </td>
      <td>
        <Link to="/deleteUser">
        <button type="button" class="btn">
        <img src={TrashIcon} alt="Delete User" />         
        </button>
        </Link>
      </td>
      </tr>
    </div>
  );
};

export default UsersProfile;
