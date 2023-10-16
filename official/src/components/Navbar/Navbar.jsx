import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { TbPower } from "react-icons/tb";

const Navbar = ({ setAuth }) => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setAuth(false);
  };
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="company logo" width={50} height={50} />
        </div>
        <div className="right">
          <Link to={"/"} className="dashboard-link">
            Dashboard Happy
          </Link>
          <div className="nav-user">
            <TbPower onClick={handleLogout} />
          </div>
          <Outlet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
