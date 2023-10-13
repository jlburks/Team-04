import { useState, useEffect } from "react";

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
    setCLabels(
      props.dailyTime.map((time) => time.workday.split("Z")[0].slice(0, -1))
    );
    setCData(props.dailyTime.map((time) => time.total_seconds));
    return;
  }, [props.dailyTime]);

  const data = {
    labels: cLables,
    datasets: [
      {
        label: "seconds",
        data: cData,
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <>
      <div>
        <h2>DAILY</h2>
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default BarChart;
