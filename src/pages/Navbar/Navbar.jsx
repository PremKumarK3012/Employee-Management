import React from "react";
import profile from "../../assets/profile.jpg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-light ">
        <div class="container-fluid">
          <div className="top-button  d-flex justify-between align-items-center">
            <div className="top-icon">
              <i class="bi bi-gear"></i>
            </div>
            <div className="top-icon">
              <span>
                <i class="bi bi-bell"></i>
              </span>
            </div>
            <div className="profile">
              <img src={profile} alt="pro" />
            </div>
          </div>
        </div>
        <hr />
      </nav>
      <div className="bar"></div>
    </>
  );
};

export default Navbar;
