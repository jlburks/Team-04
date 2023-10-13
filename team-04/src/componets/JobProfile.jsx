import axios from "axios";
import { Link, useParams } from "react-router-dom";

import EditJob from "../pages/EditJob";
import DeleteJobButton from "./DeleteJobButton";
import AddToJob from "./AddToJob";

import EditIcon from "../icons/edit.svg";

const JobProfile = (props) => {
  console.log("PROPS FOR USER ADD JOB currentUserId=>", props.currentUserId);

  return (
    <>
      <div className="col-7" style={{ textAlign: "-webkit-center" }}>
        <span class="badge badge-light">
          {props.action === "delete" && <DeleteJobButton jobId={props.jobId} />}
          {props.action === "add" && (
            <AddToJob jobId={props.jobId} userId={props.currentUserId} />
          )}
        </span>
        <div
          className={
            props.active == 1
              ? "card text-white bg-primary mb-3"
              : "card text-white bg-secondary mb-3"
          }
        >
          <div className="card-header">{props.jobName}</div>
          <div className="card-body">
            <p className="card-text">{props.jobDescription}</p>
            <p className="card-text">
              {props.active == 1 ? "active" : "inactive"}
            </p>
          </div>
          <div>
            {console.log(props.jobId)}
            {props.action === "delete" && (
              <Link to={`/admin/editJob/${props.jobId}`}>
                <img src={EditIcon} alt="Edit Job" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobProfile;
