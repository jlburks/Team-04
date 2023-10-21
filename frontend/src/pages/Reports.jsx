import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../componets/BarChart";
import ReportTable from "../componets/Tables";

const Reports = () => {
  const [chartData, setChartData] = useState({});

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
        "http://127.0.0.1:3000/reports/userTimes",
        config
      );
      console.log("RESPONSE =>>>", response.data);
      const dailyTimes = response.data;
      return setChartData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form>
      <div>
        <h1>Reports</h1>
        <div>
          {/* {Object.keys(chartData).length > 0 && <ReportTable times={chartData} />} */}
        </div>
        <br />
        <br />
        <div>
          {Object.keys(chartData).length > 0 && <BarChart times={chartData} />}
        </div>
      </div>
    </form>
  );
};

export default Reports;
