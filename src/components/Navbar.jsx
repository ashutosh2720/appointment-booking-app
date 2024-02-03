import React from "react";
import "../styles/Nav.css";
import logo from "../../public/vite.svg";
import { GrShare } from "react-icons/gr";
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="nav-main">
      <div className="logo">
        <img
          style={{ height: "50px" }}
          src="https://www.pngitem.com/pimgs/m/613-6136271_book-an-appointment-sign-hd-png-download.png"
          alt=""
        />
      </div>
      <div className="nav-links">
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span>Menu</span>{" "}
          <span style={{ color: "green", fontSize: "12px" }}>
            <FaAngleDown />
          </span>
        </p>
        <p>Contact Us</p>
        <p className="share-link">
          {" "}
          <GrShare />
          <p>Share Link</p>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
