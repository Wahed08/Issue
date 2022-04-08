import React from "react";
import { TextField, Typography, Button, ButtonGroup} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./SignUp.css";

const SignUp = () => {
  const useStyles = makeStyles((theme) => ({
    textFiled: {
      width: "30%",
      paddingBottom: "20px",
    },
    buttonFiled: {
      marginRight: "20px",
      flexGrow: '1'
    },
  }));

  const classes = useStyles();

  return (
    <div className="main-container">
      <form action="">
        <div className="form-container">
          <div className="sign-up">
            <Typography variant="h4">Sign Up</Typography>
          </div>

          <TextField
            type="text"
            label="Name"
            className={classes.textFiled}
            required
          />
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
          <TextField
            type="password"
            label="Confirm Password"
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
    </div>
  );
};

export default SignUp;
