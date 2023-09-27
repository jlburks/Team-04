import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import CheckInCheckOut from "./pages/CheckInOut";
import Reports from "./pages/Reports";
import AdminActions from "./pages/AdminActions";
import Login from "./pages/Login";

import NavBar from "./componets/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>TechPro Constructions</h1>
          <NavBar isAdmin={isAdmin} />
          <Routes>
            <Route path="/" element={<CheckInCheckOut />} />
            <Route path="/reports" element={<Reports />} />
            {isAdmin && (
              <Route path="/adminActions" element={<AdminActions />} />
            )}
          </Routes>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      )}
    </>
  );
}

export default App;
