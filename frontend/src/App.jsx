import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CheckInCheckOut from "./pages/CheckInOut";
import Reports from "./pages/Reports";
import Jobs from "./pages/Jobs";
import Users from "./pages/Users";
import Login from "./pages/Login";
import AddJob from "./pages/AddJob";
import AddUser from "./pages/AddUser";
import NavBar from "./componets/NavBar";
import EditJob from "./pages/EditJob";
import DeleteJobButton from "./componets/DeleteJobButton";
import AssignJob from "./pages/AssignJob";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="app-container">
    <div className="sidebar">
    <div className="logo-container">
          <img
            src="http://www.techprousa.com/wp-content/uploads/2015/08/logo.png"
            alt="TechPro Constructions"
          ></img>
    </div>
    <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} /> {/* Pass the isLoggedIn status as a prop */}
    </div>
      <div className="main-content">
        {isLoggedIn ? (
                <Routes>
                  <Route path="/" element={<CheckInCheckOut />} />
                  <Route path="/addJob" element={<AddJob />} />
                  <Route path="/addUser" element={<AddUser />} />
                  <Route path="/reports" element={<Reports />} />
                  {isAdmin && <Route path="/admin/Jobs" element={<Jobs />} />}
                  {isAdmin && <Route path="/admin/Users" element={<Users />} />}
                  {isAdmin && (
                    <Route path="/admin/editJob/:jobId" element={<EditJob />} />
                  )}
                  {isAdmin && (
                    <Route
                      path="/admin/assignJob/:userId"
                      element={<AssignJob />}
                    />
                  )}
                  {isAdmin && (
                    <Route
                      path="/admin/DeleteJob/:jobId"
                      element={<DeleteJobButton />}
                    />
                  )}
                </Routes>
        ) : (
          <div>
            <nav className="navbar-light bg-light">
              <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
