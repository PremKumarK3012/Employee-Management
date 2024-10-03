import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <aside>
          <h1>RS-TECH</h1>
          <hr />

          <div className="pages">
            <div className="page">
              <Link to="/">
                <span>
                  <i class="bi bi-grid-fill"></i>
                </span>
                {"  "}
                Dashboard
              </Link>
            </div>
            <div className="emp">
              <Link to="/">
                <span>
                  <i class="bi bi-people-fill"></i>
                </span>
                {"  "}
                Employee
              </Link>
            </div>
            <div className="page">
              <Link to="/">
                <span>
                  <i class="bi bi-calendar-week-fill"></i>
                </span>
                {"  "}
                Calendar
              </Link>
            </div>
            <div className="page ">
              <Link to="/">
                <span>
                  <i class="bi bi-chat-square-text-fill"></i>
                </span>
                {"  "}
                Message
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
