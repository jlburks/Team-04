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

const JobChart = (props) => {
  return (
    <>
      <h1>Roprts for jobs</h1>
    </>
  );
};

export default JobChart;
