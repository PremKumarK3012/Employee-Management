import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./View.css";
import Context from "../../Mycontext/Context";
import axios from "axios";

const ViewEmployee = () => {
  const { selectedId, setData, data } = useContext(Context);
  console.log(selectedId);
  console.log(data);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/getById/${selectedId}`)
      .then((res) => {
        setData(res.data.response);
        // console.log(res.data);

        // setFilteremp(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="contain">
      <form>
        <div>
          <div className="head">
            <span className="arrow">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                  />
                </svg>
              </Link>
            </span>

            <h2>View Employee Details</h2>
          </div>

          <div className="info">
            <span className="d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <h5>Personal Information</h5>
            </span>
            <div className="bor"></div>
          </div>

          <div className="custum-file-upload">
            <img src={data.Image} alt="img" />
          </div>

          <div className="d-flex">
            <div className="view-formContainer">
              <label>Name</label>
              <span>{data.EmployeeName}</span>
            </div>
            <div className="view-formContainer">
              <label>EmployeeID</label>
              <span>{data.EmployeeID}</span>
            </div>
          </div>
          <div className="view-bor"></div>

          <div className="d-flex">
            <div className="view-formContainer">
              <label>Department</label>
              <span>{data.Department}</span>
            </div>
            <div class="view-formContainer">
              <label>Designation</label>
              <span>{data.Designation}</span>
            </div>
          </div>
          <div className="view-bor"></div>

          <div className="d-flex">
            <div className="view-formContainer">
              <label>Project</label>
              <span>{data.Project}</span>
            </div>
            <div class="view-formContainer">
              <label>Type</label>
              <span>{data.Type}</span>
            </div>
          </div>
          <div className="view-bor"></div>

          <div className="d-flex">
            <div className="view-formContainer">
              <label>Status</label>
              <span>{data.Status}</span>
            </div>
          </div>
          <div className="view-bor"></div>
        </div>
      </form>
    </div>
  );
};
export default ViewEmployee;
