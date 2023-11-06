import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ChangeUserTime = () => {
  const { workday, userId, project_id, workEndDay } = useParams();

  // console.log("enddate ==>", workEndDay);

  const [workHourRecord, setWorkHourRecord] = useState(0);

  const [newSYear, setNewSYear] = useState("");
  const [newSMonth, setNewSMonth] = useState("");
  const [newSDay, setNewSDay] = useState("");
  const [newSHour, setNewSHour] = useState("");
  const [newSMinute, setNewSMinute] = useState("");
  const [newSSecond, setNewSSecond] = useState("");

  const [newEYear, setNewEYear] = useState("");
  const [newEMonth, setNewEMonth] = useState("");
  const [newEDay, setNewEDay] = useState("");
  const [newEHour, setNewEHour] = useState("");
  const [newEMinute, setNewEMinute] = useState("");
  const [newESecond, setNewESecond] = useState("");

  const [sYear, setSYear] = useState("");
  const [sMonth, setSMonth] = useState("");
  const [sDay, setSDay] = useState("");
  const [sHour, setSHour] = useState("");
  const [sMinute, setSMinute] = useState("");
  const [sSecond, setSSecond] = useState("");

  const [eYear, setEYear] = useState("");
  const [eMonth, setEMonth] = useState("");
  const [eDay, setEDay] = useState("");
  const [eHour, setEHour] = useState("");
  const [eMinute, setEMinute] = useState("");
  const [eSecond, setESecond] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .put(
        `http://127.0.0.1:3000/users/editTime/${userId}/${workday}/${project_id}`,
        config
      )
      .then((res) => {
        console.log("-", res.data.workHourId);
        setWorkHourRecord(res.data.workHourId);
        const [year, month, day, hour, minute, seconds] =
          workday.split(/[- :]/);
        const [eyear, emonth, eday, ehour, eminute, eseconds] =
          workEndDay.split(/[- :]/);
        setSYear(year);
        setNewSYear(year);
        setSMonth(month);
        setNewSMonth(month);
        setSDay(day);
        setNewSDay(day);
        setSHour(hour);
        setNewSHour(hour);
        setSMinute(minute);
        setNewSMinute(minute);
        setSSecond(seconds);
        setNewSSecond(seconds);

        setEYear(eyear);
        setNewEYear(eyear);
        setEMonth(emonth);
        setNewEMonth(emonth);
        setEDay(eday);
        setNewEDay(eday);
        setEHour(ehour);
        setNewEHour(ehour);
        setEMinute(eminute);
        setNewEMinute(eminute);
        setESecond(eseconds);
        setNewESecond(eseconds);
      })

      .catch((e) => {
        console.log(e);
      });
  }, []);

  // new start date
  const handleSYear = (e) => {
    setNewSYear(e.target.value);
  };
  const handleSMonth = (e) => {
    setNewSMonth(e.target.value);
  };
  const handleSDay = (e) => {
    setNewSDay(e.target.value);
  };
  const handleSHour = (e) => {
    setNewSHour(e.target.value);
  };
  const handleSMinute = (e) => {
    setNewSMinute(e.target.value);
  };
  const handleSSecond = (e) => {
    setNewSSecond(e.target.value);
  };

  // new end date
  const handleEYear = (e) => {
    setNewEYear(e.target.value);
  };
  const handleEMonth = (e) => {
    setNewEMonth(e.target.value);
  };
  const handleEDay = (e) => {
    setNewEDay(e.target.value);
  };
  const handleEHour = (e) => {
    setNewEHour(e.target.value);
  };
  const handleEMinute = (e) => {
    setNewEMinute(e.target.value);
  };
  const handleESecond = (e) => {
    setNewESecond(e.target.value);
  };

  //api call to change time
  const changeTime = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const start = `${newSYear}-${newSMonth}-${newSDay} ${newSHour}:${newSMinute}:${newSSecond}`;
    const finish = `${newEYear}-${newEMonth}-${newEDay} ${newEHour}:${newEMinute}:${newESecond}`;
    axios
      .put(
        `http://127.0.0.1:3000/users/insertNewTime/${workHourRecord}/${start}/${finish}`
      )
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <d1>Change User Time</d1>

      <div>
        <h1>Start Time</h1>
        <input
          type="text"
          maxLength="4"
          defaultValue={sYear}
          onChange={handleSYear}
        />
        <span>:</span>
        <input
          type="text"
          maxLength="2"
          defaultValue={sMonth}
          onChange={handleSMonth}
        />
        <span>:</span>
        <input
          type="text"
          maxLength="2"
          defaultValue={sDay}
          onChange={handleSDay}
        />
        <span> </span>
        <input
          type="text"
          maxLength="2"
          defaultValue={sHour}
          onChange={handleSHour}
        />
        <span>:</span>
        <input
          type="text"
          maxLength="2"
          defaultValue={sMinute}
          onChange={handleSMinute}
        />
        <span>:</span>
        <input
          type="text"
          maxLength="2"
          defaultValue={sSecond}
          onChange={handleSSecond}
        />
      </div>
      <div>
        <h1>End Time</h1>
        <input
          type="text"
          maxLength="4"
          defaultValue={eYear}
          onChange={handleEYear}
        />
        <span>:</span>
        <input
          type="text"
          maxLength="2"
          defaultValue={eMonth}
          onChange={handleEMonth}
        />
        <span>:</span>
        <input
          type="text"
          maxLength="2"
          defaultValue={eDay}
          onChange={handleEDay}
        />
        <span> </span>
        <input
          type="text"
          maxLength="2"
          defaultValue={eHour}
          onChange={handleEHour}
        />
        <span>:</span>
        <input
          type="text"
          maxLength="2"
          defaultValue={eMinute}
          onChange={handleEMinute}
        />
        <span>:</span>
        <input
          type="text"
          maxLength="2"
          defaultValue={eSecond}
          onChange={handleESecond}
        />
      </div>
      <button onClick={changeTime}>Submit</button>
    </>
  );
};

export default ChangeUserTime;
