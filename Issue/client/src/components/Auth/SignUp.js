import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Typography, Button, ButtonGroup } from "@material-ui/core";
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
    },
    loginButton: {
      marginLeft: "10px",
    },
  }));

  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          throw new Error(responseData.message);
        }
        if (response.ok) {
          navigate("/auth/login");
        }
      } catch (err) {
        throw err;
      }
    }
  };
  return (
    <div className="main-container">
      <form onSubmit={submitHandler}>
        <div className="form-container">
          <div className="sign-up">
            <Typography variant="h4">Sign Up</Typography>
          </div>

          <TextField
            type="text"
            label="Name"
            className={classes.textFiled}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="email"
            label="Email"
            className={classes.textFiled}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            className={classes.textFiled}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            label="Confirm Password"
            className={classes.textFiled}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
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
      </form>
      <div className="login-text">
        <h2>Already have an account?</h2>
        <Button variant="text" color="primary" className={classes.loginButton}>
          <Link to="/auth/login">Log In</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
