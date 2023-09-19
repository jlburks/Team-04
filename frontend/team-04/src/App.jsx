import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import CheckInCheckOut from "./pages/CheckInOut";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

import NavBar from "./componets/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>TechPro Constructions</h1>
          <NavBar />
          <Routes>
            <Route path="/" element={<CheckInCheckOut />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;
