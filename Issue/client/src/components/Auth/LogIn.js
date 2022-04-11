import React from "react";
import { TextField, Typography, Button, ButtonGroup } from "@material-ui/core";
import{Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./SignUp.css";

const LogIn = () => {
  const useStyles = makeStyles((theme) => ({
    textFiled: {
      width: "30%",
      paddingBottom: "20px",
    },
    buttonFiled: {
      marginRight: "20px",
    },
    loginButton: {
      marginLeft: "10px",
    },
  }));

  const classes = useStyles();

  return (
    <div className="main-container">
      <form action="">
        <div className="form-container">
          <div className="sign-up">
            <Typography variant="h4">Log In</Typography>
          </div>
          <TextField
            type="email"
            label="Email"
            className={classes.textFiled}
            required
          />
          <TextField
            type="password"
            label="Password"
            className={classes.textFiled}
            required
          />
        </div>
      </form>

      <div className="button-container">
        <ButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonFiled}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </ButtonGroup>
      </div>
      <div className="login-text">
        <h2>Doesn't have account?</h2>
        <Button variant="text" color="primary" className={classes.loginButton}>
          <Link to="/auth/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default LogIn;
