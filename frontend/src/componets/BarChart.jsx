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
  const [activeTab, setActiveTab] = useState("Daily");
  const [cLabels, setCLabels] = useState([]);
  const [cData, setCData] = useState([]);

  useEffect(() => {
    let filteredDailyTime = props.dailyTime;

    if (activeTab === "Daily") {
      const currentDate = new Date();
      const currentDateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;

      const dateMap = new Map();
      filteredDailyTime
        .filter((time) => time.workday.split("T")[0] === currentDateString)
        .forEach((time) => {
          if (dateMap.has(currentDateString)) {
            dateMap.set(
              currentDateString,
              dateMap.get(currentDateString) + time.total_seconds / 60
            );
          } else {
            dateMap.set(currentDateString, time.total_seconds / 60);
          }
        });

      setCLabels(Array.from(dateMap.keys()));
      setCData(Array.from(dateMap.values()));
    } else if (activeTab === "Weekly") {
      const desiredStartDate = new Date("2023-10-15");
      const desiredEndDate = new Date("2023-10-21");
      filteredDailyTime = filteredDailyTime.filter((time) => {
        const workdayDate = new Date(time.workday);
        return workdayDate >= desiredStartDate && workdayDate <= desiredEndDate;
      });

      const dateMap = new Map();
      filteredDailyTime.forEach((time) => {
        const workday = time.workday.split("T")[0];
        if (dateMap.has(workday)) {
          dateMap.set(workday, dateMap.get(workday) + time.total_seconds / 60);
        } else {
          dateMap.set(workday, time.total_seconds / 60);
        }
      });

      setCLabels(Array.from(dateMap.keys()));
      setCData(Array.from(dateMap.values()));
    } else if (activeTab === "Monthly") {
      const currentDate = new Date();
      const desiredMonth = currentDate.getMonth() + 1; // Add 1 because months are zero-indexed (January is 0)
      const desiredYear = currentDate.getFullYear();
      
      filteredDailyTime = filteredDailyTime.filter((time) => {
        const workdayDate = new Date(time.workday);
        return (
          workdayDate.getMonth() + 1 === desiredMonth &&
          workdayDate.getFullYear() === desiredYear
        );
      });

      const dateMap = new Map();
      filteredDailyTime.forEach((time) => {
        const workday = time.workday.split("T")[0];
        if (dateMap.has(workday)) {
          dateMap.set(workday, dateMap.get(workday) + time.total_seconds / 60);
        } else {
          dateMap.set(workday, time.total_seconds / 60);
        }
      });

      setCLabels(Array.from(dateMap.keys()));
      setCData(Array.from(dateMap.values()));

    } else if (activeTab === "Yearly") {
      const currentDate = new Date();
      const desiredYear = currentDate.getFullYear();
      
      filteredDailyTime = filteredDailyTime.filter((time) => {
        const workdayDate = new Date(time.workday);
        console.log(workdayDate)
        return workdayDate.getFullYear() === desiredYear;
      });
      const dateMap = new Map();
      filteredDailyTime.forEach((time) => {
        const workday = time.workday.split("T")[0];
        if (dateMap.has(workday)) {
          dateMap.set(workday, dateMap.get(workday) + time.total_seconds / 60);
        } else {
          dateMap.set(workday, time.total_seconds / 60);
        }
      });

      setCLabels(Array.from(dateMap.keys()));
      setCData(Array.from(dateMap.values()));
    }
  }, [props.dailyTime, activeTab]);

  const data = {
    labels: cLabels,
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

      {activeTab === "Daily" && <Bar data={data} options={options} />}

      {activeTab === "Weekly" && <Bar data={data} options={options} />}

      {activeTab === "Monthly" && <Bar data={data} options={options} />}

      {activeTab === "Yearly" && <Bar data={data} options={options} />}
    </div>
  );
};

export default BarChart;
