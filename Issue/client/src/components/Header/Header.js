import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../Auth/auth-context";
import { Button } from "@material-ui/core";

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="header">
      <div className="container">
        <nav className="main-nav">
          <Link to="/">
            <h2>SUST ISSUES</h2>
          </Link>
          <ul className="right-menu">
            <li>
              <Link to="/about">About</Link>
            </li>
            {auth.isLoggedIn && (
              <li>
                <Link to="/create_issue">Create Issue</Link>
              </li>
            )}
            {auth.isLoggedIn ? (
              <Link to="/">
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={auth.logout}
                >
                  Log Out
                </Button>
              </Link>
            ) : (
              <li>
                <Link to="/auth/signup">Authentication</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
