import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import Styles from "./SignUp.module.css";

const SignUp = () => {
  const useStyles = makeStyles((theme) => ({
    button:{
      width: "34.5em",
      height: "3em",
    },
    '@media(max-width: 815px)':{
        button:{
          width: "28.5em",
        }
    },
    '@media(max-width: 650px)':{
      button:{
        width: "23em",
      }
  }
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
      <div className={Styles.container}>
        <div className={Styles.signup}>
          <Typography variant="h4">Sign Up</Typography>
        </div>
        <div className={Styles.formContainer}>
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
            <div>
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Submit
              </Button>
            </div>
            <div className={Styles.loginText}>
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
