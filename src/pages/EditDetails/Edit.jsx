import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Context from "../../Mycontext/Context";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const { selectedId, setData, data } = useContext(Context);
  const navigate = useNavigate();

  // Set loading and image preview states
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Set null initially

  useEffect(() => {
    axios
      .get(
        `https://employee-management-server-1gh8.onrender.com/employee/getById/${selectedId}`
      )
      .then((res) => {
        setData(res.data.response); // Set employee data from API response
        setImagePreview(res.data.response.Image); // Set the initial image preview from the response
      })
      .catch((err) => console.log(err));
  }, [selectedId, setData]);

  // Handle image change
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    // If file is uploaded (for image input)
    if (type === "file" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set image preview for UI
      };
      reader.readAsDataURL(file); // Convert image file to base64
      setData((prevData) => ({
        ...prevData,
        [name]: file, // Store file in the data state
      }));
    } else {
      // For other inputs
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("EmployeeName", data.EmployeeName);
    formData.append("EmployeeID", data.EmployeeID);
    formData.append("Department", data.Department);
    formData.append("Designation", data.Designation);
    formData.append("Project", data.Project);
    formData.append("Type", data.Type);
    formData.append("Status", data.Status);

    // Fetching Data From API
    if (data.Image) {
      formData.append("Image", data.Image); // Append the image file
    }

    try {
      const response = await axios.put(
        `https://employee-management-server-1gh8.onrender.com/employee/update/${selectedId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/"); // Redirect after successful update
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="contain">
      {/* Form Starts From Here */}
      <form onSubmit={handleSubmit}>
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
            <h2>Edit Employee Details</h2>
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
                // Show image preview
                <img src={imagePreview} alt="Preview" />
              ) : (
                // Show pencil icon if no image is available
                <span
                  onClick={() => document.getElementById("Image").click()}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </span>
              )}

              {/* file input */}
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                id="Image"
                name="Image"
                style={{ display: "none" }}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {/* Form Fields */}
          <div className="d-flex">
            <div className="formContainer">
              <input
                placeholder=""
                type="text"
                value={data.EmployeeName || ""}
                onChange={handleChange}
                name="EmployeeName"
                id="EmployeeName"
                required
              />
              <label>Name*</label>
            </div>
            <div className="formContainer">
              <input
                placeholder=""
                type="text"
                value={data.EmployeeID || ""}
                onChange={handleChange}
                name="EmployeeID"
                id="EmployeeID"
                required
              />
              <label>Employee Id*</label>
            </div>
          </div>

          <div className="d-flex">
            <div className="formContainer">
              <select
                value={data.Type || ""}
                onChange={handleChange}
                name="Type"
                id="Type"
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
            <div className="formContainer">
              <select
                value={data.Designation || ""}
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
            <div className="formContainer">
              <input
                placeholder=""
                type="text"
                value={data.Project || ""}
                onChange={handleChange}
                name="Project"
              />
              <label>Project*</label>
            </div>
            <div className="formContainer">
              <select
                value={data.Type || ""}
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
            <div className="formContainer">
              <input
                placeholder=""
                type="text"
                name="Status"
                id="Status"
                value={data.Status || ""}
                onChange={handleChange}
                required
              />
              <label>Status*</label>
            </div>
          </div>
          {/* Buttons For Submit and Cancel to update Employee  */}
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
