import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./LandingPage.css";
import { makeStyles } from "@material-ui/core/styles";

const LandingPage = () => {
  const useStyles = makeStyles((theme) => ({
    buttonFiled: {
      marginRight: "20px",
    },
  }));

  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="body">
        <div className="heading">
          <h2>Welcome to SUST Issue</h2>
        </div>

        <div className="button">
          <Button
            variant="contained"
            color="indigo"
            className={classes.buttonFiled}
          >
            <Link to="/auth">Sign Up</Link>
          </Button>
          <Button variant="contained" color="indigo">
            Log In
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;