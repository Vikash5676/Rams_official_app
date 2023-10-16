import React from "react";
import "../Footer/Footer.css";

const Footer = () => {
  const date = new Date();

  return (
    <footer className="foot">
      <div className="foot-content">
        &copy; All Rights Reserved 2019-{date.getFullYear()} Ram's Enterprises
      </div>
    </footer>
  );
};

export default Footer;
