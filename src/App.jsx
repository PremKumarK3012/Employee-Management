import Sidebar from "./pages/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import "./App.css";
import Employee from "./pages/Employee/Employee";
import Addemployee from "./pages/AddEmployee/Addemployee";
import Edit from "./pages/EditDetails/Edit";
import { Context } from "./Mycontext/Context";
import { useState, useEffect } from "react";
import ViewEmployee from "./pages/ViewEmployee/ViewEmployee";
import axios from "axios";
const App = () => {
  const [data, setData] = useState({
    EmployeeName: "",
    EmployeeID: "",
    Department: "",
    Designation: "",
    Project: "",
    Type: "",
    Status: "",
    Image: "",
  });
  const [selectedId, setSelectedId] = useState("");

  // Fetching the All Employee data

  return (
    <div>
      <section className="d-flex">
        <div>
          <Sidebar />
        </div>

        <div className="container-content">
          <div className="nav">
            <Navbar />
          </div>
          <Context.Provider
            value={{ data, setData, selectedId, setSelectedId }}
          >
            <Routes>
              <Route path="/" element={<Employee />} />
              <Route path="add" element={<Addemployee />} />
              <Route path="edit" element={<Edit />} />
              <Route path="view" element={<ViewEmployee />} />
            </Routes>
          </Context.Provider>
        </div>
      </section>
    </div>
  );
};

export default App;
