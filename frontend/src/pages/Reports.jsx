import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../componets/BarChart";
import ReportTable from "../componets/Tables";

const Reports = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        "http://127.0.0.1:3000/reports/daily",
        config
      );
      const dailyTimes = response.data.dailyTimes;
      console.log("response =>", response.data.dailyTimes);
      return setChartData(response.data.dailyTimes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form>
      <div>
      <h1>Reports</h1>

        <div>
          <ReportTable dailyTime={chartData} />
        </div>
        <br /><br />
        <div>
          <BarChart dailyTime={chartData} />
        </div>
      </div>
    </form>
  );
};

export default Reports;
