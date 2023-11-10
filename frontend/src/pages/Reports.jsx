import { useState, useEffect } from "react";
import { Link } from "react-dom";
import axios from "axios";
import BarChart from "../componets/BarChart";
import JobChart from "../componets/JobChart";
import ReportTable from "../componets/Tables";
import UserDropDown from "../componets/UserDropDown";

const Reports = (props) => {
  console.log("REPORT PROPS", props);
  const [chartData, setChartData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [reportType, setReportType] = useState("userReports");

  const getSelectedUser = (sUser, sUserId) => {
    setSelectedUser(sUser);
  };

  useEffect(() => {
    fetchData();
  }, [selectedUser]);

  const fetchData = async () => {
    try {
      const requestData = {
        selectedUser: selectedUser,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        selectedUser: selectedUser,
      };
      const response = await axios.post(
        "http://127.0.0.1:3000/reports/userTimes",
        requestData,
        config
      );
      console.log("RESPONSE.DATA =>>>", response.data);
      const dailyTimes = response.data;
      console.log("Here lies dailyTimes ==>", dailyTimes);
      setChartData(response.data);
      const response2 = await axios.post(
        "http://127.0.0.1:3000/reports/compJobs",
        requestData,
        config
      );
      return console.log("Response 2 =>>>", response2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changeUserReports = () => {
    setReportType("userReports");
  };
  const changeJobReports = () => {
    setReportType("jobReports");
  };

  return (
    <form>
      {reportType === "userReports" && (
        <div>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={changeUserReports}
              disabled={props.isAdmin != true}
            >
              User Reports
            </button>
            {props.isAdmin && (
              <button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={changeJobReports}
              >
                Job Reports
              </button>
            )}
          </div>
          <br />
          <div>
            {props.isAdmin && (
              <UserDropDown setUser={setSelectedUser} adminId={props.adminId} />
            )}
            {Object.keys(chartData).length > 0 && (
              <BarChart
                times={chartData}
                selectedUser={selectedUser}
                isAdmin={props.isAdmin}
                setUser={selectedUser}
              />
            )}
          </div>
        </div>
      )}
      {reportType === "jobReports" && (
        <div>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={changeUserReports}
              disabled={props.isAdmin != true}
            >
              User Reports
            </button>
            {props.isAdmin && (
              <button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={changeJobReports}
              >
                Job Reports
              </button>
            )}
          </div>
          <br />
          <div>
            {props.isAdmin && (
              <UserDropDown setUser={setSelectedUser} adminId={props.adminId} />
            )}
            {Object.keys(chartData).length > 0 && (
              <JobChart
                times={chartData}
                selectedUser={selectedUser}
                isAdmin={props.isAdmin}
                setUser={selectedUser}
              />
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default Reports;
