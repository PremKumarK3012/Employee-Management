import React, { useState } from "react";
import "./App.css";

import Navbar from "./pages/Navbar/Navbar";
import Edit from "./pages/EditDetails/Edit";
import Sidebar from "./pages/Sidebar/Sidebar";
import Employee from "./pages/Employee/Employee";
import ViewEmployee from "./pages/ViewEmployee/ViewEmployee";
import Addemployee from "./pages/AddEmployee/Addemployee";

import { Route, Routes } from "react-router-dom";
import { Context } from "./Mycontext/Context";

const App = () => {
  const [selectedId, setSelectedId] = useState("");
  const [data, setData] = useState({
    EmployeeName: "",
    EmployeeID: "",
    Department: "",
    Designation: "",
    Project: "",
    Type: "",
    Status: "",
    Image: null,
  });

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
          <Context.Provider // wrapping the contextApi
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
