import React, { useContext, useState } from "react";
import {
  Link,
  useNavigate,
  BrowserRouter as Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Styles from "./Header.module.css";
import { AuthContext } from "../Auth/auth-context";
import { Button, makeStyles } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import BugReportIcon from "@mui/icons-material/BugReport";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Hamburger from "./Hamburger";
import SearchBar from "./SearchBar";

const Header = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginRight: theme.spacing(1),
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
    setOpenAlert(false);
    handleClose();
    navigate("/");
    auth.logout();
  };

  //for alert dialog
  const [openAlert, setOpenAlert] = useState(false);
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <React.Fragment>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <nav className={Styles.mainNav}>
            <Link to="/">
              <h2>SUST Teacher's Association</h2>
            </Link>
            <ul className={Styles.rightMenu}>
              <li className={Styles.search}>
                {/* <Routes> */}
                  {/* <Route> */}
                   <SearchBar navigate={navigate} />
                  {/* </Route> */}
                {/* </Routes> */}
              </li>

              <li className={Styles.about}>
                <Link to="/about">About</Link>
              </li>
              {auth.isLoggedIn && (
                <li className={Styles.create}>
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
            <div className={Styles.hamburger}>
              {" "}
              <Hamburger />
            </div>
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
                  <AccountCircleIcon style={{ marginRight: "5px" }} /> My
                  Account
                </MenuItem>
              </Link>

              {auth.isAdmin && (
                <Link to="/admin/users-list">
                  <MenuItem onClick={handleClose}>
                    <PeopleIcon style={{ marginRight: "5px" }} /> Users
                  </MenuItem>
                </Link>
              )}

              {auth.isAdmin && (
                <Link to="/admin/issues-list">
                  <MenuItem onClick={handleClose}>
                    <BugReportIcon style={{ marginRight: "5px" }} /> Issues
                  </MenuItem>
                </Link>
              )}

              <MenuItem onClick={handleOpenAlert}>
                <LogoutIcon style={{ marginRight: "7px" }} /> Logout
              </MenuItem>
            </Menu>
          </nav>
        </div>
        <div>
          <Dialog
            open={openAlert}
            onClose={handleCloseAlert}
            className={{ paper: classes.dialog }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Log Out?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure? You want to log out?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseAlert}
                variant="contained"
                color="primary"
              >
                No
              </Button>
              <Button onClick={logOut} variant="contained" color="primary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
