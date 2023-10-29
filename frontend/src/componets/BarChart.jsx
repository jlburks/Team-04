import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Tables from "./Tables";
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
  const [cLabels, setCLabels] = useState([]);
  const [cData, setCData] = useState([]);

  const [yearFilter, setYearFilter] = useState(2023);
  const [monthFilter, setMonthFilter] = useState(10);

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
    let filteredDailyTime;
    console.log("BarChart ==>", props);
    let filteredTimes = props.times;

    if (activeTab === "Daily") {
      const existingData = {}; // Create an object to store existing data by date

      // Iterate through the existing data and update the total_seconds

      filteredTimes.dailyTimes.forEach((time) => {
        if (time.workyear === yearFilter && time.workmonth === monthFilter) {
          const date = time.workday.split("T")[0];
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
      console.log("WEEKLY TIMES ===> ", filteredTimes.weeklyTimes);
      filteredTimes.weeklyTimes.forEach((time) => {
        if (time.workyear === yearFilter && time.workmonth === monthFilter) {
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
        if (time.workyear === yearFilter) {
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
  }, [props, activeTab, yearFilter, monthFilter]);

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

      <div>
        {(activeTab === "Monthly" || activeTab === "Weekly") && (
          <div>
            <h7>Year Filter:</h7>
            <button
              onClick={(e) => {
                e.preventDefault();
                setYearFilter(2021);
                setMonthFilter("");
              }}
            >
              2021
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setYearFilter(2022);
                setMonthFilter("");
              }}
            >
              2022
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setYearFilter(2023);
                setMonthFilter("");
              }}
            >
              2023
            </button>
          </div>
        )}
        {(activeTab === "Daily" || activeTab === "Weekly") && (
          <div>
            <h7>Month Filter:</h7>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(1);
              }}
            >
              January
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(2);
              }}
            >
              February
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(3);
              }}
            >
              March
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(4);
              }}
            >
              April
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(5);
              }}
            >
              May
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(6);
              }}
            >
              June
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(7);
              }}
            >
              July
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(8);
              }}
            >
              August
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(9);
              }}
            >
              September
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(10);
              }}
            >
              October
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(11);
              }}
            >
              November
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonthFilter(12);
              }}
            >
              December
            </button>

            <div>
              <h7>Year Filter:</h7>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setYearFilter(2021);
                }}
              >
                2021
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setYearFilter(2022);
                }}
              >
                2022
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setYearFilter(2023);
                }}
              >
                2023
              </button>
            </div>
          </div>
        )}
        <div>
          <h2>
            {activeTab === "Weekly" || activeTab === "Daily" ? (
              <h2>{`${monthlyNames[monthFilter - 1]} ${yearFilter}`}</h2>
            ) : null}
            {activeTab === "Monthly" && <h2>{`${yearFilter}`}</h2>}
          </h2>
        </div>
        {activeTab === "Daily" && <Bar data={data} options={options} />}
        {activeTab === "Weekly" && <Bar data={data} options={options} />}
        {activeTab === "Monthly" && <Bar data={data} options={options} />}
        {activeTab === "Yearly" && <Bar data={data} options={options} />}
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
