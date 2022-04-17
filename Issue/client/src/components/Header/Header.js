import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../Auth/auth-context";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";

const Header = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginRight: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const auth = useContext(AuthContext);

  return (
    <div className="header">
      <div className="container">
        <nav className="main-nav">
          <Link to="/">
            <h2>SUST ISSUES</h2>
          </Link>
          <ul className="right-menu">
            <li className="about">
              <Link to="/about">About</Link>
            </li>
            {auth.isLoggedIn && (
              <li>
                <Link to="/create_issue">Create Issue</Link>
              </li>
            )}
            {auth.isLoggedIn ? (
              <li>
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
              </li>
            ) : (
              <li>
                <Link to="/auth/signup">
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    className={classes.root}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button color="primary" variant="contained" size="small">
                    Log IN
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
