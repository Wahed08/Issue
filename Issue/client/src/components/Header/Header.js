import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../Auth/auth-context";
import { Button, makeStyles } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Profile from "../BodyComponent/Profile/Profile";

const Header = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginRight: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const auth = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () =>{
    auth.logout();
  }

  return (
    <div className="header">
      <div className="container">
        <nav className="main-nav">
          <Link to="/">
            <h2>SUST Teacher's Association</h2>
          </Link>
          <ul className="right-menu">
            <li className="about">
              <Link to="/about">About</Link>
            </li>
            {auth.isLoggedIn && (
              <li className="create">
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
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to="/profile"><MenuItem onClick={handleClose}>My Account</MenuItem></Link>
            <Link to="/update-profile"><MenuItem onClick={handleClose}>Update Profile</MenuItem></Link>
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Menu>
        </nav>
      </div>
    </div>
  );
};

export default Header;
