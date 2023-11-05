import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

import DownloadIcons from "../icons/box-arrow-down.svg";
import EditIcons from "../icons/edit.svg";

const ReportTable = (props) => {
  console.log("PROPS FOUND IN REPORT TABLE", props);
  const [requestedData, setRequestedData] = useState([]);

  const formatCSVTime = (totalHours) => {
    const hours = Math.floor(totalHours / 3600);
    const minutes = Math.floor((totalHours % 3600) / 60);
    const seconds = Math.floor(totalHours % 60);
    const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;
    return formattedTime;
  };

  const monthlyNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const openEditTimes = (data) => {
    console.log(data);
    axios
      .put(`http://127.0.0.1:3000/users/editTime/10`)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formatISODate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };
  console.log("REPORT TABLE TIMES ===>", props.data);

  let tableHeaders;
  let tableRows;

  if (props.activeTab === "Daily") {
    tableHeaders = (
      <>
        <th scope="col">Day</th>
        <th scope="col">Project</th>
        <th scope="col">Total Hours</th>
        {props.isAdmin && <th scope="col">Change Times</th>}
      </>
    );
  } else if (props.activeTab === "Weekly") {
    tableHeaders = (
      <>
        <th scope="col">Week</th>
        <th scope="col">Project</th>
        <th scope="col">Total Hours</th>
      </>
    );
  } else if (props.activeTab === "Monthly") {
    tableHeaders = (
      <>
        <th scope="col">Month</th>
        <th scope="col">Project</th>
        <th scope="col">Total Hours</th>
      </>
    );
  } else if (props.activeTab === "Yearly") {
    tableHeaders = (
      <>
        <th scope="col">Year</th>
        <th scope="col">Project</th>
        <th scope="col">Total Hours</th>
      </>
    );
  }

  if (props.activeTab === "Daily") {
    const filteredData = props.data.dailyTimes.filter((rowData) => {
      return (
        rowData.workmonth === props.monthFilter &&
        rowData.workyear === props.yearFilter
      );
    });
    console.log("$$$$DAILY ==>", filteredData);

    tableRows = filteredData.map((rowData, index) => {
      const hours = Math.floor(rowData.total_seconds / 3600);
      const minutes = Math.floor((rowData.total_seconds % 3600) / 60);
      const seconds = Math.floor(rowData.total_seconds % 60);
      const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;
      console.log("ROWDATAAA", rowData);

      return (
        <tr key={index}>
          <td>{formatISODate(rowData.workday)}</td>
          <td>{rowData.jobName}</td>
          <td>{formattedTime}</td>
          {props.isAdmin && (
            <td>
              <Link
                to={`/users/changeTimes/${rowData.user_id}/${rowData.workday}/${rowData.project_id}`}
              >
                <img src={EditIcons} alt="+" />
              </Link>
            </td>
          )}
        </tr>
      );
    });
  } else if (props.activeTab === "Weekly") {
    console.log(props.data.weeklyTimes, "$$$$");
    const filteredData = props.data.weeklyTimes.filter((rowData) => {
      return (
        rowData.workmonth === props.monthFilter &&
        rowData.workyear === props.yearFilter
      );
    });
    // setRequestedData(filteredData);

    tableRows = filteredData.map((rowData, index) => {
      const hours = Math.floor(rowData.total_seconds / 3600);
      const minutes = Math.floor((rowData.total_seconds % 3600) / 60);
      const seconds = Math.floor(rowData.total_seconds % 60);
      const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;

      return (
        <tr key={index}>
          <td>{`${formatISODate(rowData.week_start_date)}-${formatISODate(
            rowData.week_end_date
          )}`}</td>
          <td>{rowData.jobName}</td>
          <td>{formattedTime}</td>
        </tr>
      );
    });
  } else if (props.activeTab === "Monthly") {
    const filteredData = props.data.monthlyTimes.filter((rowData) => {
      return rowData.workyear === props.yearFilter;
    });
    // setRequestedData(filteredData);

    tableRows = filteredData.map((rowData, index) => {
      const hours = Math.floor(rowData.total_seconds / 3600);
      const minutes = Math.floor((rowData.total_seconds % 3600) / 60);
      const seconds = Math.floor(rowData.total_seconds % 60);

      const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;

      return (
        <tr key={index}>
          <td>{`${monthlyNames[rowData.workmonth - 1]}`}</td>
          <td>{rowData.jobName}</td>
          <td>{formattedTime}</td>
        </tr>
      );
    });
  } else if (props.activeTab === "Yearly") {
    const filteredData = props.data.yearlyTimes;

    tableRows = filteredData.map((rowData, index) => {
      const hours = Math.floor(rowData.total_seconds / 3600);
      const minutes = Math.floor((rowData.total_seconds % 3600) / 60);
      const seconds = Math.floor(rowData.total_seconds % 60);
      const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;

      return (
        <tr key={index}>
          <td>{rowData.workyear}</td>
          <td>{rowData.jobName}</td>
          <td>{formattedTime}</td>
        </tr>
      );
    });
  } else {
    tableRows = (
      <tr>
        <td colSpan="3">No data available</td>
      </tr>
    );
  }

  return (
    <>
      <div>
        <table className="table table-striped">
          <thead>
            {console.log("Headers ===>>>>>", tableHeaders)}
            {console.log("Rows ===>>>>>", tableRows)}
            <tr>{tableHeaders}</tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      {props.activeTab === "Daily" && (
        <>
          <div class="text-center">
            <CSVLink
              data={props.data.dailyTimes
                .filter((rowData) => {
                  return (
                    rowData.workmonth === props.monthFilter &&
                    rowData.workyear === props.yearFilter
                  );
                })
                .map((rowData) => {
                  return {
                    workday: formatISODate(rowData.workday),
                    total_hours: formatCSVTime(rowData.total_seconds),
                    job_name: rowData.jobName,
                  };
                })}
              filename="userReports.csv"
            >
              <button type="button" class="btn btn-dark btn-floating">
                <i class="fa fa-download"></i> Download
              </button>
            </CSVLink>
          </div>
        </>
      )}
      {props.activeTab === "Weekly" && (
        <>
          <div class="text-center">
            <CSVLink
              data={props.data.weeklyTimes
                .filter((rowData) => {
                  return (
                    rowData.workmonth === props.monthFilter &&
                    rowData.workyear === props.yearFilter
                  );
                })
                .map((rowData) => {
                  return {
                    week: `${formatISODate(
                      rowData.week_start_date
                    )} - ${formatISODate(rowData.week_end_date)}`,
                    total_hours: formatCSVTime(rowData.total_seconds),
                    job_name: rowData.jobName,
                  };
                })}
              filename="userReports.csv"
            >
              <button type="button" class="btn btn-dark btn-floating">
                <i class="fa fa-download"></i> Download
              </button>
            </CSVLink>
          </div>
        </>
      )}
      {props.activeTab === "Monthly" && (
        <>
          <div class="text-center">
            <CSVLink
              data={props.data.monthlyTimes
                .filter((rowData) => {
                  return rowData.workyear === props.yearFilter;
                })
                .map((rowData) => {
                  return {
                    year: rowData.workyear,
                    month: monthlyNames[rowData.workmonth - 1],
                    total_hours: formatCSVTime(rowData.total_seconds),
                    job_name: rowData.jobName,
                  };
                })}
              filename="userReports.csv"
            >
              <button type="button" class="btn btn-dark btn-floating">
                <i class="fa fa-download"></i> Download
              </button>
            </CSVLink>
          </div>
        </>
      )}
      {props.activeTab === "Yearly" && (
        <>
          <div class="text-center">
            <CSVLink
              data={props.data.yearlyTimes.map((rowData) => {
                return {
                  year: rowData.workyear,
                  total_hours: formatCSVTime(rowData.total_seconds),
                  job_name: rowData.jobName,
                };
              })}
              filename="userReports.csv"
            >
              <button type="button" class="btn btn-dark btn-floating">
                <i class="fa fa-download"></i> Download
              </button>
            </CSVLink>
          </div>
        </>
      )}
    </>
  );
};

export default ReportTable;
