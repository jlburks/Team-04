import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = (props) => {
  console.log(props);
  const [activeTab, setActiveTab] = useState("Daily"); 
  const [cLables, setCLabels] = useState([]);
  const [cData, setCData] = useState([]);

  useEffect(() => {
    console.log("BarChart", props);
    console.log(typeof props.dailyTime[0]);
    console.log("VVVV", props.dailyTime[0]);
    console.log(
      "USE EFFECT",
      props.dailyTime.map((time) => time.workday)
    );
    let filteredDailyTime = props.dailyTime;
    if (activeTab === "Daily") {
      const currentDate = new Date();
      filteredDailyTime = filteredDailyTime.filter((time) => {
        const workdayDate = new Date(time.workday);
        return (
          currentDate.getDate() === workdayDate.getDate() &&
          currentDate.getMonth() === workdayDate.getMonth() &&
          currentDate.getFullYear() === workdayDate.getFullYear()
        );
      });
    } else if (activeTab === "Weekly") {
      const desiredStartDate = new Date("2023-10-01");
      const desiredEndDate = new Date("2023-10-17");
      filteredDailyTime = filteredDailyTime.filter((time) => {
        const workdayDate = new Date(time.workday);
        return workdayDate >= desiredStartDate && workdayDate <= desiredEndDate;
      });
    } else if (activeTab === "Monthly") {
      const desiredMonth = 10;
      const desiredYear = 2023;
      filteredDailyTime = filteredDailyTime.filter((time) => {
        const workdayDate = new Date(time.workday);
        return (
          workdayDate.getMonth() + 1 === desiredMonth &&
          workdayDate.getFullYear() === desiredYear
        );
      });
    } else if (activeTab === "Yearly") {
      const desiredYear = 2023;
      filteredDailyTime = filteredDailyTime.filter((time) => {
        const workdayDate = new Date(time.workday);
        return workdayDate.getFullYear() === desiredYear;
      });
    }
    setCLabels(filteredDailyTime.map((time) => time.workday.split("T")[0]));
    setCData(filteredDailyTime.map((time) => time.total_seconds / 60));
  }, [props.dailyTime, activeTab]);
  const data = {
    labels: cLables,
    datasets: [
      {
        label: "Hours",
        data: cData,
        backgroundColor: "silver",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};
  
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
          <Bar data={data} options={options} />
      )}

      {activeTab === "Weekly" && (
          <Bar data={data} options={options} />
      )}

      {activeTab === "Monthly" && (
          <Bar data={data} options={options} />
      )}

      {activeTab === "Yearly" && (
          <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default BarChart;
