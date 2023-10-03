import { useState } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import CheckInCheckOut from "./pages/CheckInOut";
import Reports from "./pages/Reports";
import AdminActions from "./pages/AdminActions";
import Login from "./pages/Login";

import NavBar from "./componets/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="app-container">
    <div className="sidebar">
      <h1>TechPro Constructions</h1>
      <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} /> {/* Pass the isLoggedIn status as a prop */}
    </div>
    <div className="content">
      {isLoggedIn ? (
        
          <Routes>
            <Route path="/" element={<CheckInCheckOut />} />
            <Route path="/reports" element={<Reports />} />
            {isAdmin && (
              <Route path="/adminActions" element={<AdminActions />} />
            )}
          </Routes>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      )}
    </div>
    </div>
  );
}

export default App;
