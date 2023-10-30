require("dotenv").config();

const secret = process.env.jwtSecret;

const express = require("express");
const Route = express.Router();
const jwt = require("jsonwebtoken");

const connection = require("../../connection");
const { verifyUser, verifyAdmin } = require("../functions/verifyAdmin");

Route.get("/userTimes", verifyUser, (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "").trim();
  console.log("TOKEN =>", token);
  const userId = req.userId;
  connection.query(
    `SELECT
    DATE(start_time) AS workday,
    MONTH(start_time) AS workmonth, 
    YEAR(start_time) AS workyear,
    project_id,
    user_id,
    SUM(TIME_TO_SEC(TIMEDIFF(end_time, start_time))) AS total_seconds
FROM
    workHours
WHERE
    user_id = ?
GROUP BY
    workday,
    workmonth, -- Add workmonth to GROUP BY
    project_id,
    user_id
HAVING 
    total_seconds > 0
ORDER BY
    workday;
`,
    [userId],
    (e, dTimes) => {
      if (e) {
        res.json({
          errMessage:
            "ISSUE RUNNING QUERY SELECT * FROM workHours WHERE user_id",
        });
      }
      connection.query(
        `SELECT
        YEAR(week_start_date) AS workyear,
        WEEK(week_start_date) AS workweek,
        MONTH(subquery.start_time) AS workmonth,
        MIN(week_start_date) AS week_start_date,
        MAX(week_end_date) AS week_end_date,
        project_id,
        user_id,
        SUM(total_seconds) AS total_seconds
    FROM (
        SELECT
            DATE(start_time - INTERVAL WEEKDAY(start_time) DAY) AS week_start_date,
            DATE_ADD(DATE(start_time - INTERVAL WEEKDAY(start_time) DAY), INTERVAL 6 DAY) AS week_end_date,
            project_id,
            user_id,
            start_time,  -- Include start_time in the subquery result
            SUM(TIME_TO_SEC(TIMEDIFF(end_time, start_time))) AS total_seconds
        FROM
            workHours
        WHERE
            user_id = ?
        GROUP BY
            week_start_date,
            project_id,
            user_id
    ) AS subquery
    GROUP BY
        workyear,
        workweek,
        project_id,
        user_id
    `,
        [userId],
        (e, wTimes) => {
          if (e) {
            res.json({
              errMessage:
                "ISSUE RUNNING QUERY SELECT * FROM workHours WHERE user_id",
            });
          }
          connection.query(
            `SELECT
            YEAR(start_time) AS workyear,
            MONTH(start_time) AS workmonth,
            MIN(start_time) AS month_start_date,
            MAX(end_time) AS month_end_date,
            project_id,
            user_id,
            SUM(TIME_TO_SEC(TIMEDIFF(end_time, start_time))) AS total_seconds
        FROM
            workHours
        WHERE
            user_id = ?
        GROUP BY
            workyear,
            workmonth,
            project_id,
            user_id`,
            [userId],
            (e, mTimes) => {
              if (e) {
                res.json({
                  errMessage:
                    "ISSUE RUNNING QUERY SELECT * FROM workHours WHERE user_id",
                });
              }
              connection.query(
                `SELECT
                YEAR(start_time) AS workyear,
                MIN(start_time) AS year_start_date,
                MAX(end_time) AS year_end_date,
                project_id,
                user_id,
                SUM(TIME_TO_SEC(TIMEDIFF(end_time, start_time))) AS total_seconds
            FROM
                workHours
            WHERE
                user_id = ?
            GROUP BY
                workyear,
                project_id,
                user_id`,
                [userId],
                (e, yTimes) => {
                  if (e) {
                    res.json({
                      errMessage:
                        "ISSUE RUNNING QUERY SELECT * FROM workHours WHERE user_id",
                    });
                  }
                  res.json({
                    dailyTimes: dTimes,
                    weeklyTimes: wTimes,
                    monthlyTimes: mTimes,
                    yearlyTimes: yTimes,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports = Route;
