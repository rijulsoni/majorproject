import React, { useState, useContext } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Brand from "../images/logo-png.png";
import "./Navbar.css";
import { Badge } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { UseCart } from "../context/cart";
import axios from "axios";

const Navbar = () => {

 
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = UseCart();

  const [isOpen, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  

  

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      data: null,
      token: "",
      message: "",
      alert: "",
    });
    localStorage.removeItem("auth");
    navigate("/profile");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar">
      <div className="contain">
        <div className="logo">
          <NavLink to="/">
            <img style={{ height: "57px" }} src={Brand} alt="logo" />
          </NavLink>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul style={{ marginTop: "2px" }}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <div className="dropdown">
                <button className="dropbtn" for="btnControl">
                  Products Category
                </button>
                <div className="dropdown-content">
                  <Link to="/smartwatches">Smartwatches</Link>
                  <Link to="/wirelessEarbuds">Wireless Earbuds</Link>
                  <Link to="/neckbands">Neckbands</Link>
                  <Link to="/headphones">Headphones</Link>
                  <Link to="/wirelessSpeakers">Wireless Speakers</Link>
                  <Link to="/gamingheadphones">Gaming Headphones</Link>
                  <Link to="/powerbanks">Power Banks</Link>
                  <Link to="/chargers">Chargers</Link>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="/product">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <div style={{ display: "flex" }}>
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    size="2x"
                    color="gray"
                  />
                  <Badge count={cart?.length} showZero />
                </div>
              </NavLink>
            </li>
            {auth.data ? (
              <>
                <li>
                  <div className="dropdown">
                    <button
                      style={{ fontWeight: "unset" }}
                      className="dropbtn"
                      for="btnControl"
                    >
                      Welcome, {auth.data.name.split(" ")[0]}
                    </button>
                   
                    <div
                      
                      className="dropdown-content"
                      style={{
                     
                        width: "110px",
                        cursor: "pointer",
                      }}
                    > 
                     
                     <Link  to={`/orderplaced`}>Orders</Link>
                  <div onClick={handleLogout}>
                   <Link>Logout <FontAwesomeIcon
                        icon={faSignOutAlt}
                        size="1x"
                        color="grey"
                      /></Link>
                      </div>
                     
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/profile">
                    <FontAwesomeIcon icon={faUser} size="2x" color="grey" />
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="center" style={{ marginTop: " -15px" }}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
