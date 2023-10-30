import React from "react";

const ReportTable = (props) => {
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

  const formatISODate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };
  console.log("REPORT TABLE TIMES ===>", props.data);

  let tableHeaders;

  if (props.activeTab === "Daily") {
    tableHeaders = (
      <>
        <th scope="col">day</th>
        <th scope="col">project</th>
        <th scope="col">total hours</th>
      </>
    );
  } else if (props.activeTab === "Weekly") {
    tableHeaders = (
      <>
        <th scope="col">week</th>
        <th scope="col">project</th>
        <th scope="col">total hours</th>
      </>
    );
  } else if (props.activeTab === "Monthly") {
    tableHeaders = (
      <>
        <th scope="col">month</th>
        <th scope="col">project</th>
        <th scope="col">total hours</th>
      </>
    );
  } else if (props.activeTab === "Yearly") {
    tableHeaders = (
      <>
        <th scope="col">year</th>
        <th scope="col">project</th>
        <th scope="col">total hours</th>
      </>
    );
  }

  let tableRows;

  if (props.activeTab === "Daily") {
    const filteredData = props.data.dailyTimes.filter((rowData) => {
      // Assuming monthFilter and yearFilter are props
      return (
        rowData.workmonth === props.monthFilter &&
        rowData.workyear === props.yearFilter
      );
    });

    tableRows = filteredData.map((rowData, index) => (
      <tr key={index}>
        <td>{formatISODate(rowData.workday)}</td>
        <td>{rowData.project_id}</td>
        <td>{(rowData.total_seconds / 3600).toFixed(2)}</td>
      </tr>
    ));
  } else if (props.activeTab === "Weekly") {
    console.log(props.data.weeklyTimes, "$$$$");
    const filteredData = props.data.weeklyTimes.filter((rowData) => {
      // Assuming monthFilter and yearFilter are props
      return (
        rowData.workmonth === props.monthFilter &&
        rowData.workyear === props.yearFilter
      );
    });

    tableRows = filteredData.map((rowData, index) => (
      <tr key={index}>
        <td>{`${formatISODate(rowData.week_start_date)}-${formatISODate(
          rowData.week_end_date
        )}`}</td>
        <td>{rowData.project_id}</td>
        <td>{(rowData.total_seconds / 3600).toFixed(2)}</td>
      </tr>
    ));
  } else if (props.activeTab === "Monthly") {
    const filteredData = props.data.monthlyTimes.filter((rowData) => {
      // Assuming monthFilter and yearFilter are props
      return rowData.workyear === props.yearFilter;
    });

    tableRows = filteredData.map((rowData, index) => (
      <tr key={index}>
        <td>{`${monthlyNames[rowData.workmonth]}`}</td>
        <td>{rowData.project_id}</td>
        <td>{(rowData.total_seconds / 3600).toFixed(2)}</td>
      </tr>
    ));
  } else if (props.activeTab === "Yearly") {
    const filteredData = props.data.yearlyTimes;

    tableRows = filteredData.map((rowData, index) => (
      <tr key={index}>
        <td>{rowData.workyear}</td>
        <td>{rowData.project_id}</td>
        <td>{(rowData.total_seconds / 3600).toFixed(2)}</td>
      </tr>
    ));
  } else {
    tableRows = (
      <tr>
        <td colSpan="3">No data available</td>
      </tr>
    );
  }

  return (
    <>
      {/* <h1>{props.activeTab}</h1>
      <h1>{props.yearFilter}</h1>
      <h1>{props.monthName}</h1> */}
      <table className="table table-striped">
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
};

export default ReportTable;
