import React from "react";
import { Link } from "react";
import "./Employeetable.css";

export const Employeelist = () => {
  const headers = [
    "Employee Name",
    "Employee-ID",
    "Department",
    "Designation",
    "Project",
    "Type",
    "Status",
    "Actions",
  ];
  const Tablerow = (employee) => {
    return (
      <tr>
        <td>
          <Link to={`/employee/id`} className=""></Link>
        </td>
        <td>{PremKumar}</td>
        <td>{45}</td>
        <td>{Developer}</td>
        <td>{Developer}</td>
        <td>{Emp - Management}</td>
        <td>{office}</td>
        <td>{Temporary}</td>
        <td>
          <i class="bi bi-pencil-square" role="button"></i>
        </td>
        <td>
          <i class="bi bi-pencil-square" role="button"></i>
        </td>
        <td>
          <i class="bi bi-pencil-square" role="button"></i>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((headers, i) => {
              <th key={i}>{headers}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <Tablerow />
        </tbody>
      </table>
    </div>
  );
};
