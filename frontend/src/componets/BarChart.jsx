import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Tables from "./Tables";
import NoRecords from "../icons/36e3bf06671120139042d74c7f3bca73.png";

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

  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const divStyle = {
    textAlign: "center",
  };

  const noRecordsStyle = {
    color: "red",
  };

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

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (monthFilter == "" && yearFilter == "") {
      setMonthFilter(currentMonth);
      setYearFilter(currentYear);
    }

    let filteredDailyTime;

    let filteredTimes = props.times;

    if (activeTab === "Daily") {
      const existingData = {}; // Create an object to store existing data by date

      // Iterate through the existing data and update the total_seconds

      filteredTimes.dailyTimes.forEach((time) => {
        if (time.workyear === yearFilter && time.workmonth === monthFilter) {
          const date = new Date(time.workday.split("T")[0]).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "2-digit", day: "2-digit" }
          );
          if (existingData[date]) {
            existingData[date] += time.total_seconds / 3600;
          } else {
            existingData[date] = time.total_seconds / 3600;
          }
        }
      });

      // Convert the object back to arrays for CLabels and CData
      setCLabels(Object.keys(existingData));
      setCData(Object.values(existingData));
    } else if (activeTab === "Weekly") {
      const existingData = {};

      // Iterate through the existing data and update the total_seconds

      filteredTimes.weeklyTimes.forEach((time) => {
        if (time.workyear === yearFilter && time.workmonth === monthFilter) {
          if (time.workyear !== null) {
            const startDate = new Date(
              time.week_start_date.split("T")[0]
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            const endDate = new Date(
              time.week_end_date.split("T")[0]
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            const weekKey = `${startDate} - ${endDate}`;
            if (existingData[weekKey]) {
              existingData[weekKey].total_seconds += Number(time.total_seconds);
            } else {
              existingData[weekKey] = {
                start_date: startDate,
                end_date: endDate,
                total_seconds: Number(time.total_seconds),
              };
            }
          }
        }
      });

      const labels = Object.keys(existingData);

      const data = labels.map((key) => {
        return existingData[key].total_seconds / 3600;
      });

      setCLabels(labels);
      setCData(data);
    } else if (activeTab === "Monthly") {
      const monthNames = [
        "",
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

      const existingData = {};

      filteredTimes.monthlyTimes.forEach((time) => {
        if (time.workyear === yearFilter) {
          const month = time.workmonth;

          if (month !== 0) {
            const monthName = monthNames[month];
            if (existingData[monthName]) {
              existingData[monthName] += time.total_seconds / 3600;
            } else {
              existingData[monthName] = time.total_seconds / 3600;
            }
          }
        }
      });

      setCLabels(Object.keys(existingData));
      setCData(Object.values(existingData));
    } else if (activeTab === "Yearly") {
      const existingData = {};

      filteredTimes.yearlyTimes.forEach((time) => {
        const year = time.workyear;

        if (!existingData[year]) {
          existingData[year] = 0;
        }

        existingData[year] += time.total_seconds / 3600;
      });
      setCLabels(Object.keys(existingData));
      setCData(Object.values(existingData));
    }
  }, [props, activeTab, yearFilter, monthFilter]);

  const handleYearChange = (event) => {
    setYearFilter(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setMonthFilter(parseInt(event.target.value)); //
  };

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
      <h1>{props.selectedUser}</h1>
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
      <div>
        {activeTab === "Monthly" && (
          <div>
            <h6>Year Filter:</h6>
            <select
              value={yearFilter}
              onChange={handleYearChange}
              className="form-select"
            >
              <option value="">Select Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        )}
        {(activeTab === "Daily" || activeTab === "Weekly") && (
          <div>
            <h6>Month Filter:</h6>
            <select
              value={monthFilter}
              onChange={handleMonthChange}
              className="form-select"
            >
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <div>
              <h6>Year Filter:</h6>
              <select
                value={yearFilter}
                onChange={handleYearChange}
                className="form-select"
              >
                <option value="">Select Year</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
        )}
        <div>
          {activeTab === "Weekly" || activeTab === "Daily" ? (
            <h2>{`${monthlyNames[monthFilter - 1]} ${yearFilter}`}</h2>
          ) : activeTab === "Monthly" ? (
            <h2>{`${yearFilter}`}</h2>
          ) : null}
        </div>

        <>
          {data.labels.length > 0 ? (
            <>
              {activeTab === "Daily" && <Bar data={data} options={options} />}
              {activeTab === "Weekly" && <Bar data={data} options={options} />}
              {activeTab === "Monthly" && <Bar data={data} options={options} />}
              {activeTab === "Yearly" && <Bar data={data} options={options} />}
            </>
          ) : (
            <div style={divStyle}>
              <img src={NoRecords} alt="no records" />
              <h4 style={noRecordsStyle}>No records Found</h4>
              <h6 style={noRecordsStyle}>Change search filters</h6>
            </div>
          )}
        </>
      </div>
      <div>
        <Tables
          data={props.times}
          activeTab={activeTab}
          yearFilter={yearFilter}
          monthFilter={monthFilter}
          monthName={monthlyNames[monthFilter - 1]}
        />
      </div>
    </div>
  );
};

export default BarChart;
