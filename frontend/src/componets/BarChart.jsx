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
  console.log("PROPS =======", props);
  const [activeTab, setActiveTab] = useState("Daily");
  const [cLables, setCLabels] = useState([]);
  const [cData, setCData] = useState([]);

  useEffect(() => {
    let filteredDailyTime;
    console.log("BarChart ==>", props);
    let filteredTimes = props.times;

    if (activeTab === "Daily") {
      const existingData = {}; // Create an object to store existing data by date

      // Iterate through the existing data and update the total_seconds
      filteredTimes.dailyTimes.forEach((time) => {
        const date = time.workday.split("T")[0];
        if (existingData[date]) {
          existingData[date] += time.total_seconds / 3600;
        } else {
          existingData[date] = time.total_seconds / 3600;
        }
      });

      // Convert the object back to arrays for CLabels and CData
      setCLabels(Object.keys(existingData));
      setCData(Object.values(existingData));
    } else if (activeTab === "Weekly") {
      const existingData = {};

      // Iterate through the existing data and update the total_seconds
      filteredTimes.weeklyTimes.forEach((time) => {
        if (time.workyear !== null) {
          const weekKey =
            time.week_start_date.split("T")[0] +
            " - " +
            time.week_end_date.split("T")[0];
          if (existingData[weekKey]) {
            existingData[weekKey].total_seconds += time.total_seconds;
          } else {
            existingData[weekKey] = {
              start_date: time.week_start_date.split("T")[0],
              end_date: time.week_end_date.split("T")[0],
              total_seconds: time.total_seconds,
            };
          }
        }
      });

      const labels = Object.keys(existingData);
      const data = labels.map((key) => existingData[key].total_seconds);

      setCLabels(labels);
      setCData(data);
    } else if (activeTab === "Monthly") {
      const monthNames = [
        "", // Empty string to align with month numbers (January is at index 1)
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

      const existingData = {}; // Create an object to store existing data by month

      // Iterate through the existing data and update the total_seconds
      filteredTimes.monthlyTimes.forEach((time) => {
        const month = time.workmonth;

        // Ignore months with a value of 0
        if (month !== 0) {
          const monthName = monthNames[month];
          if (existingData[monthName]) {
            existingData[monthName] += time.total_seconds / 3600;
          } else {
            existingData[monthName] = time.total_seconds / 3600;
          }
        }
      });

      // Convert the object back to arrays for CLabels and CData
      setCLabels(Object.keys(existingData));
      setCData(Object.values(existingData));
    } else if (activeTab === "Yearly") {
      const existingData = {};

      filteredTimes.yearlyTimes.forEach((time) => {
        const year = time.workyear;

        // Ignore entries with a value of 0
        if (year !== 0) {
          if (existingData[year]) {
            existingData[year] += time.total_seconds / 3600;
          } else {
            existingData[year] = time.total_seconds / 3600;
          }
        }
      });
      setCLabels(Object.keys(existingData));
      setCData(Object.values(existingData));
    }
  }, [props, activeTab]);

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

      {activeTab === "Daily" && <Bar data={data} options={options} />}

      {activeTab === "Weekly" && <Bar data={data} options={options} />}

      {activeTab === "Monthly" && <Bar data={data} options={options} />}

      {activeTab === "Yearly" && <Bar data={data} options={options} />}
    </div>
  );
};

export default BarChart;
