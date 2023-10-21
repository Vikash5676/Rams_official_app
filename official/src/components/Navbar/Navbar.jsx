import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { TbArrowLeft, TbPower } from "react-icons/tb";

const Navbar = ({ setAuth }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
    setAuth(false);
  };

  const verifytoken = async (token) => {
    const user = await window.api.verifyToken(token);
    return user;
  };

  const handleBack = () => {
    window.api.goBackHomeBoi();
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
    <>
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
      {loggedIn ? (
        <div className="px-[4.5rem] py-[1rem] bg-[var(--bg-light)]">
          <TbArrowLeft className="text-4xl" onClick={handleBack} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
