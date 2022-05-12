import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Typography, Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import "./SignUp.css";

const SignUp = () => {
  const useStyles = makeStyles((theme) => ({
    buttonFiled: {
      marginRight: "20px",
    },
    loginButton: {
      marginLeft: "3em",
    },
  }));

  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const users = { name, email, password, confirmPassword };
    if (users) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/accounts/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(users),
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          setError(responseData.message);
        }
        if (response.ok) {
          navigate(`/auth/${responseData.user._id}/verify-email`);
        }
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className="main_container">
        <div className="sign-up">
          <Typography variant="h4">Sign Up</Typography>
        </div>
        <div className="form_container">
          <form onSubmit={submitHandler}>
            <div>
              <TextField
                type="text"
                label="Name"
                variant="outlined"
                className={classes.textFiled}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                className={classes.textFiled}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                className={classes.textFiled}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <TextField
                type="password"
                label="Confirm Password"
                variant="outlined"
                className={classes.textFiled}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="button">
              <ButtonGroup>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttonFiled}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </ButtonGroup>
            </div>
            <div className="login-text">
              <h2>Already have an account ?</h2>
              <Link to="/auth/login">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
