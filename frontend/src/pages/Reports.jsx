import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../componets/BarChart";
import ReportTable from "../componets/Tables";
import UserDropDown from "../componets/UserDropDown";

const Reports = (props) => {
  console.log("REPORT PROPS", props);
  const [chartData, setChartData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

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
      return setChartData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form>
      <div>
        <h1 style={{ textAlign: "center" }}>Reports</h1>
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
    </form>
  );
};

export default Reports;
