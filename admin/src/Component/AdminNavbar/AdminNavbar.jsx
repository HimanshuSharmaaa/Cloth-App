import React from "react";
import "./AdminNavbar.css";
import logo from "../Assets/logo.png";
import AdminNavbar_logo from "../Assets/AdminNavbar_logo.webp";
import { Link } from "react-router-dom";

const AdminNavbar = () => {  
  return (
    <div className="AdminNavbar-section">
      <div className="AdminNavbar-container">
        <div className="AdminNavbar-left">
          <img src={logo} alt="AdminNavbar-img" />
          <div className="AdminNavbar-heading">
            <h1>SHOPPER</h1>
            <p>Admin Panel</p>
          </div>
        </div>
        <div className="AdminNavbar-right">
          <Link to='/login'><img src={AdminNavbar_logo} alt="AdminNavbar-icon" /></Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;