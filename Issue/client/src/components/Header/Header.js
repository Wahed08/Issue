import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../Auth/auth-context";
import { Button, makeStyles } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import BugReportIcon from "@mui/icons-material/BugReport";

const Header = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginRight: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    navigate("/");
    auth.logout();
  };

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
                <Link to="/create-issue">Create Issue</Link>
              </li>
            )}
            {!auth.isLoggedIn ? (
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
            ) : null}
            {auth.isLoggedIn ? (
              <li>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={handleClick}
                >
                  {auth.isAdmin ? "Admin" : "Dashboard"}
                  <KeyboardArrowDown />
                </Button>
              </li>
            ) : null}
          </ul>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to={`/${auth.userId}/account`}>
              <MenuItem onClick={handleClose}>
                <AccountCircleIcon style={{ marginRight: "5px" }} /> My Account
              </MenuItem>
            </Link>

            {auth.isAdmin && <Link to="/admin/users-list">
              <MenuItem onClick={handleClose}>
                <PeopleIcon style={{ marginRight: "5px" }} /> Users
              </MenuItem>
            </Link>}

            {auth.isAdmin && <Link to="/admin/issues-list">
              <MenuItem onClick={handleClose}>
                <BugReportIcon style={{ marginRight: "5px" }} /> Issues
              </MenuItem>
            </Link>}
            
            <MenuItem onClick={logOut}>
              <LogoutIcon style={{ marginRight: "7px" }} /> Logout
            </MenuItem>
          </Menu>
        </nav>
      </div>
    </div>
  );
};

export default Header;
