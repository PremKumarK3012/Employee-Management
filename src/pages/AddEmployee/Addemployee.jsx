import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addemployee = () => {
  const [value, setValue] = useState({
    EmployeeName: "",
    EmployeeID: "",
    Department: "",
    Designation: "",
    Project: "",
    Type: "",
    Status: "",
    Image: null,
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setValue((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value, // Store the file as the first element of files array
    }));
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Update state with the image preview URL
      };
      reader.readAsDataURL(file); // Convert image file to base64
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    // Prepare FormData to send the Image file and other inputs
    const formData = new FormData();
    formData.append("EmployeeName", value.EmployeeName);
    formData.append("EmployeeID", value.EmployeeID);
    formData.append("Department", value.Department);
    formData.append("Designation", value.Designation);
    formData.append("Project", value.Project);
    formData.append("Type", value.Type);
    formData.append("Status", value.Status);

    if (value.Image) {
      formData.append("Image", value.Image); // This will send the file as binary
    }

    try {
      const response = await axios.post(
        "https://employee-management-server-1gh8.onrender.com/employee/create",
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
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout. Please try again.");
      } else {
        toast.error("An error occurred while uploading.");
      }
    }
  };

  return (
    <div className="contain">
      {/* Form Container */}
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div>
          <div className="head">
            <span className="arrow">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                  />
                </svg>
              </Link>
            </span>
            <h2>Add New Employee</h2>
          </div>

          <div className="info">
            <span className="d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <h5>Personal Information</h5>
            </span>
            <div className="bor"></div>
          </div>

          <div>
            <label className="custum-file-upload" htmlFor="Image">
              {imagePreview ? (
                // Show the image preview after the image is uploaded
                <img src={imagePreview} alt="Preview" ref={fileRef} />
              ) : (
                // Initially show the SVG camera icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-camera"
                  viewBox="0 0 16 16"
                  onClick={() => document.getElementById("Image").click()} // Trigger file input on click
                  style={{ cursor: "pointer" }}
                >
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                </svg>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                id="Image"
                name="Image"
                style={{ display: "none" }} // Hide the input field
                onChange={handleChange} // Handle the image upload
                ref={fileRef}
              />
            </label>
          </div>

          {/* Other input fields  */}

          <div className="d-flex">
            <div class="formContainer">
              <input
                placeholder="Enter Name"
                type="text"
                value={value.EmployeeName}
                onChange={handleChange}
                name="EmployeeName"
                id="EmployeeName"
                required
              />
              <label>Name*</label>
            </div>
            <div class="formContainer">
              <input
                placeholder="Enter employeeID"
                type="number"
                value={value.EmployeeID}
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
              <select
                value={value.Department}
                onChange={handleChange}
                name="Department"
                id="Department"
                required
              >
                <option value="" disabled>
                  Select your Department
                </option>
                <option>Engineering</option>
                <option>Project Management</option>
                <option>Cloud Services</option>
                <option>It Support</option>
              </select>

              <label>Department*</label>
            </div>
            <div class="formContainer">
              <select
                value={value.Designation}
                onChange={handleChange}
                name="Designation"
                id="Designation"
                required
              >
                <option value="" disabled>
                  Select your Designation
                </option>
                <option>Software Engineer</option>
                <option>Full Stack Developer</option>
                <option>Front End Developer</option>
                <option>Java Developer</option>
                <option>Ui/UX Designer</option>
              </select>

              <label>Designation*</label>
            </div>
          </div>

          <div className="d-flex">
            <div class="formContainer">
              <input
                placeholder="Enter Project"
                type="text"
                name="Project"
                id="Project"
                value={value.Project}
                onChange={handleChange}
                required
              />
              <label>Project*</label>
            </div>
            <div class="formContainer">
              <select
                value={value.Type}
                onChange={handleChange}
                name="Type"
                id="Type"
                required
              >
                <option value="" disabled>
                  Select your Type
                </option>
                <option>On-Site</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Internship</option>
              </select>
              <label>Type*</label>
            </div>
          </div>

          <div className="d-flex">
            <div class="formContainer">
              <input
                placeholder="Enter Status"
                type="text"
                name="Status"
                id="Status"
                value={value.Status}
                onChange={handleChange}
                required
              />
              <label>Status*</label>
            </div>
          </div>
          {/* Button For Submit and Cancel To Create Employee */}
          <div className="sub-btn">
            <button className="can-btn" type="button" onClick={navigate("/")}>
              Cancel
            </button>
            <button type="submit">Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addemployee;
