import React, { useContext, useEffect, useState } from "react";
import "./Employee.css";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../Mycontext/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Employee = () => {
  const { data, setData, selectedId, setSelectedId } = useContext(Context);
  const [filteremp, setFilteremp] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get(
        "https://employee-management-server-1gh8.onrender.com/employee/getAll"
      )
      .then((res) => {
        setData(res.data.data);
        setFilteremp(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = (emp) => {
    setSelectedId(emp);
  };

  const handleViewClick = (emp) => {
    setSelectedId(emp);
    navigate("view");
  };

  const handleEditClick = (emp) => {
    setSelectedId(emp);
    navigate("edit");
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredemp = data.filter((employee) => {
      return (
        employee.EmployeeName &&
        employee.EmployeeName.toLowerCase().includes(searchText)
      );
    });
    setFilteremp(filteredemp);
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://employee-management-server-1gh8.onrender.com/employee/delete/${selectedId}`
      )
      .then((res) => {
        toast.success(res.data.message);
        fetchdata();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="d-flex flex-column col-12">
        <ToastContainer />
        <div className="heading">
          <div className="title">
            <h1>Employee</h1>
          </div>
          <div className="search-add">
            <div className="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                placeholder="Search Employee"
                type="search"
                className="input"
                onChange={handleSearch}
              />
            </div>

            <div className="add-btn">
              <button>
                <Link
                  to="add"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  <span>Add New Employee</span>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <td>Employee Name</td>
                <td>Employee ID</td>
                <td>Department</td>
                <td>Designation</td>
                <td>Project</td>
                <td>Type</td>
                <td>Status</td>
                <td colSpan={5}>Action</td>
              </tr>
            </thead>
            {filteremp && filteremp.length > 0 ? (
              <tbody>
                {filteremp.map((emp, i) => (
                  <tr key={emp._id}>
                    <td>
                      <img
                        src={emp.Image}
                        alt="emp-img"
                        style={{ width: "50px", margin: "2px" }}
                      />
                      {emp.EmployeeName}
                    </td>
                    <td>{emp.EmployeeID}</td>
                    <td>{emp.Department}</td>
                    <td>{emp.Designation}</td>
                    <td>{emp.Project}</td>
                    <td>{emp.Type}</td>
                    <td>{emp.Status}</td>
                    <td>
                      <button
                        // data-toggle="modal"
                        // data-target="#deleteModal"
                        onClick={() => handleViewClick(emp._id)}
                      >
                        <span>
                          {" "}
                          <i className="bi bi-eye"></i>
                        </span>
                      </button>
                      <button
                        // data-toggle="modal"
                        // data-target="#deleteModal"
                        onClick={() => handleEditClick(emp._id)}
                      >
                        <span>
                          {" "}
                          <i className="bi bi-pencil-square"></i>
                        </span>
                      </button>
                      <button
                        data-toggle="modal"
                        data-target="#deleteModal"
                        onClick={() => handleDeleteClick(emp._id)}
                      >
                        <span>
                          <i className="bi bi-trash3"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center">
                    No Employee Found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this employee?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
