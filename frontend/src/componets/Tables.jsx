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
      return (
        rowData.workmonth === props.monthFilter &&
        rowData.workyear === props.yearFilter
      );
    });

    tableRows = filteredData.map((rowData, index) => {
      const hours = Math.floor(rowData.total_seconds / 3600);
      const minutes = Math.floor((rowData.total_seconds % 3600) / 60);
      const seconds = Math.floor(rowData.total_seconds % 60);
      const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;
      console.log("ROWDATA", rowData);

      return (
        <tr key={index}>
          <td>{formatISODate(rowData.workday)}</td>
          <td>{rowData.jobName}</td>
          <td>{formattedTime}</td>
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

    tableRows = filteredData.map((rowData, index) => {
      const hours = Math.floor(rowData.total_seconds / 3600);
      const minutes = Math.floor((rowData.total_seconds % 3600) / 60);
      const seconds = Math.floor(rowData.total_seconds % 60);

      const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;

      return (
        <tr key={index}>
          <td>{`${monthlyNames[rowData.workmonth]}`}</td>
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
