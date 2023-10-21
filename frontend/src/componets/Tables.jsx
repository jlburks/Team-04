import React, { useState } from "react";

const ReportTable = (props) => {
  const [activeTab, setActiveTab] = useState("Daily");

  return (
    <div>
      <div className="nav nav-tabs">
        <div
          className={`nav-link ${activeTab === "Daily" ? "active" : ""}`}
          onClick={() => setActiveTab("Daily")}
        >
          <h4>Daily</h4>
        </div>
        <div
          className={`nav-link ${activeTab === "Weekly" ? "active" : ""}`}
          onClick={() => setActiveTab("Weekly")}
        >
          <h4>Weekly</h4>
        </div>

        <div
          className={`nav-link ${activeTab === "Monthly" ? "active" : ""}`}
          onClick={() => setActiveTab("Monthly")}
        >
          <h4>Monthly</h4>
        </div>

        <div
          className={`nav-link ${activeTab === "Yearly" ? "active" : ""}`}
          onClick={() => setActiveTab("Yearly")}
        >
          <h4>Yearly</h4>
        </div>
      </div>

      {activeTab === "Daily" && (
        <div class="container">
          <table className="table table-responsive table-hover">
            <thead class="table-light">
              <tr>
                <th>Workday</th>
                <th>User ID</th>
                <th>Total Seconds</th>
                <th>Project ID</th>
              </tr>
            </thead>
            <tbody>
              {props.dailyTime
                .filter((time, index, self) => {
                  const currentDate = new Date();
                  const workdayDate = new Date(time.workday);
                  return (
                    self.findIndex(
                      (t) =>
                        t.workday === time.workday && t.user_id === time.user_id
                    ) === index &&
                    currentDate.getDate() === workdayDate.getDate() &&
                    currentDate.getMonth() === workdayDate.getMonth() &&
                    currentDate.getFullYear() === workdayDate.getFullYear()
                  );
                })
                .map((time, index) => (
                  <tr key={index}>
                    <td>{time.workday.split("T")[0]}</td>
                    <td>{time.user_id}</td>
                    <td>{time.total_seconds}</td>
                    <td>{time.project_id}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Weekly" && (
        <div>
          <table className="table table-responsive table-hover">
            <thead class="table-light">
              <tr>
                <th>Workday</th>
                <th>User ID</th>
                <th>Total Seconds</th>
                <th>Project ID</th>
              </tr>
            </thead>
            <tbody>
              {props.dailyTime
                .filter((time, index, self) => {
                  const currentDate = new Date();
                  const workdayDate = new Date(time.workday);
                  const weekStartDate = getWeekStartDate(currentDate);
                  const weekEndDate = getWeekEndDate(currentDate);
                  return (
                    self.findIndex(
                      (t) =>
                        t.workday === time.workday && t.user_id === time.user_id
                    ) === index &&
                    workdayDate >= weekStartDate &&
                    workdayDate <= weekEndDate
                  );
                })
                .map((time, index) => (
                  <tr key={index}>
                    <td>{time.workday.split("T")[0]}</td>
                    <td>{time.user_id}</td>
                    <td>{time.total_seconds}</td>
                    <td>{time.project_id}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Monthly" && (
        <div>
          <table className="table table-responsive table-hover">
            <thead class="table-light">
              <tr>
                <th>Workday</th>
                <th>User ID</th>
                <th>Total Seconds</th>
                <th>Project ID</th>
              </tr>
            </thead>
            <tbody>
              {props.dailyTime
                .filter((time, index, self) => {
                  const currentDate = new Date();
                  const workdayDate = new Date(time.workday);
                  return (
                    self.findIndex(
                      (t) =>
                        t.workday === time.workday && t.user_id === time.user_id
                    ) === index &&
                    currentDate.getMonth() === workdayDate.getMonth() &&
                    currentDate.getFullYear() === workdayDate.getFullYear()
                  );
                })
                .map((time, index) => (
                  <tr key={index}>
                    <td>{time.workday.split("T")[0]}</td>
                    <td>{time.user_id}</td>
                    <td>{time.total_seconds}</td>
                    <td>{time.project_id}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Yearly" && (
        <div>
          <table className="table table-responsive table-hover">
            <thead class="table-light">
              <tr>
                <th>Workday</th>
                <th>User ID</th>
                <th>Total Seconds</th>
                <th>Project ID</th>
              </tr>
            </thead>
            <tbody>
              {props.dailyTime
                .filter((time, index, self) => {
                  const currentDate = new Date();
                  const workdayDate = new Date(time.workday);
                  return (
                    self.findIndex(
                      (t) =>
                        t.workday === time.workday && t.user_id === time.user_id
                    ) === index &&
                    currentDate.getFullYear() === workdayDate.getFullYear()
                  );
                })
                .map((time, index) => (
                  <tr key={index}>
                    <td>{time.workday.split("T")[0]}</td>
                    <td>{time.user_id}</td>
                    <td>{time.total_seconds}</td>
                    <td>{time.project_id}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

function getWeekStartDate(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function getWeekEndDate(date) {
  const weekStartDate = getWeekStartDate(date);
  return new Date(weekStartDate.setDate(weekStartDate.getDate() + 6));
}

export default ReportTable;
