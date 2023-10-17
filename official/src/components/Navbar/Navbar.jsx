import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { TbPower } from "react-icons/tb";

const Navbar = ({ setAuth }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setAuth(false);
  };

  const verifytoken = async (token) => {
    const user = await window.api.verifyToken(token);
    return user;
  };

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const userAuth = async () => {
      const user = await verifytoken(token);
      if (user) {
        setLoggedIn(true);
      }
    };
    userAuth();
  }, [token, setAuth]);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="company logo" width={50} height={50} />
        </div>
        <div className="right">
          <Link to={"/"} className="dashboard-link">
            Dashboard
          </Link>
          <div className="nav-user">
            {loggedIn ? <TbPower onClick={handleLogout} /> : ""}
          </div>
          <Outlet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
