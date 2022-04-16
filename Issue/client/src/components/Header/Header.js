import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  
  return (
    <div className="header">
      <div className="container">
        <nav className="main-nav">
          <Link to="/">
            <h2>SUST ISSUES</h2>
          </Link>
          <ul className="right-menu">
            <li>
              <Link to="/issue">About</Link>
            </li>
            <li>
              <Link to="/issue">Services</Link>
            </li>
            <li>
              <Link to="/create_issue">Create Issue</Link>
            </li>
            <li>
              <Link to="/auth/signup" >Authentication</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
