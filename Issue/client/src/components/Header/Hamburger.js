import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
// import { makeStyles } from "@material-ui/core";
import { AuthContext } from "../Auth/auth-context";

const Hamburger = () => {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    auth.logout();
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
        variant="outlined"
        color="secondary"
      >
        <MenuIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Link to="/about">
          <MenuItem onClick={handleClose}>About</MenuItem>
        </Link>
        {auth.isLoggedIn && <Link to="/create-issue">
          <MenuItem onClick={handleClose}>Create Issue</MenuItem>
        </Link>}

        {auth.isLoggedIn && <Link to={`/${auth.userId}/account`}>
          <MenuItem onClick={handleClose}>My Account</MenuItem>
        </Link>}

        {!auth.isLoggedIn && <Link to="/auth/signup">
          <MenuItem onClick={handleClose}>Sign Up</MenuItem>
        </Link>}

        {!auth.isLoggedIn && <Link to="/auth/login">
          <MenuItem onClick={handleClose}>Log In</MenuItem>
        </Link>}

        {auth.isLoggedIn && auth.isAdmin && <Link to="/admin/issues-list">
          <MenuItem onClick={handleClose}>All Issues</MenuItem>
        </Link>}
        {auth.isLoggedIn && auth.isAdmin && <Link to="/admin/users-list">
          <MenuItem onClick={handleClose}>All Users</MenuItem>
        </Link>}
        {auth.isLoggedIn && <MenuItem onClick={logOut}>Log out</MenuItem>}
      </Menu>
    </div>
  );
};

export default Hamburger;
