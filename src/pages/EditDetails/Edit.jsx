import React, { useState, useContext, useEffect } from "react";
import Context from "../../Mycontext/Context";
import "./Edit.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const { selectedId, setData, data } = useContext(Context);
  console.log(data);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/getById/${selectedId}`)
      .then((res) => {
        setData(res.data.response);
      })
      .catch((err) => console.log(err));
  }, []);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value, // Store the file as the first element of files array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    // Prepare FormData to send the Image file and other inputs
    const formData = new FormData();
    formData.append("EmployeeName", data.EmployeeName);
    formData.append("EmployeeID", data.EmployeeID);
    formData.append("Department", data.Department);
    formData.append("Designation", data.Designation);
    formData.append("Project", data.Project);
    formData.append("Type", data.Type);
    formData.append("Status", data.Status);

    if (data.Image) {
      formData.append("Image", data.Image); // This will send the file as binary
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/employee/update/${selectedId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="contain">
      <form onSubmit={handleSubmit}>
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

            <h2>Edit Employee Details</h2>
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

          <div>
            <label class="custum-file-upload" for="file">
              <span>
                <i class="bi bi-pencil-square"></i>
              </span>
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                id="Image"
                // onChange={handleChange}
                name="Image"
                // value={data.Image}
                // required
              />
            </label>
          </div>

          <div className="d-flex">
            <div class="formContainer">
              <input
                placeholder=""
                type="text"
                value={data.EmployeeName}
                onChange={handleChange}
                name="EmployeeName"
                id="EmployeeName"
                required
              />
              <label>Name*</label>
            </div>
            <div class="formContainer">
              <input
                placeholder=""
                type="text"
                value={data.EmployeeID}
                onChange={handleChange}
                name="EmployeeID"
                id="EmployeeID"
                required
              />
              <label>Employee Id*</label>
            </div>
          </div>

          <div className="d-flex">
            <div class="formContainer">
              <input
                placeholder=""
                type="text"
                value={data.Department}
                onChange={handleChange}
                name="Department"
                id="Department"
                required
              />
              <label>Department*</label>
            </div>
            <div class="formContainer">
              <select
                value={data.Designation}
                onChange={handleChange}
                name="Designation"
                id="Designation"
                required
              >
                <option value="" disabled>
                  Select your Designation
                </option>
                <option>Developer</option>
              </select>

              <label>Designation*</label>
            </div>
          </div>

          <div className="d-flex">
            <div class="formContainer">
              <input
                placeholder=""
                type="text"
                value={data.Project}
                name="Project"
                onChange={handleChange}
              />
              <label>Project*</label>
            </div>
            <div class="formContainer">
              <select
                value={data.Type}
                onChange={handleChange}
                name="Type"
                id="Type"
                required
              >
                <option value="" disabled>
                  Select your Type
                </option>
                <option>Developer</option>
              </select>
              <label>Type*</label>
            </div>
          </div>

          <div className="d-flex">
            <div class="formContainer">
              <input
                placeholder=""
                type="text"
                name="Status"
                id="Status"
                value={data.Status}
                onChange={handleChange}
                required
              />
              <label>Status*</label>
            </div>
          </div>

          <div className="sub-btn">
            <button className="can-btn"> Cancel</button>
            <button type="submit"> Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Edit;
