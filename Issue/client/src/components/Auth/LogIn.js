import React, { useContext, useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { makeStyles } from "@material-ui/core/styles";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import Styles from "./SignUp.module.css";

const LogIn = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      width: "34.5em",
      height: "3em",
    },
    "@media(max-width: 815px)": {
      button: {
        width: "28.5em",
      },
    },
    "@media(max-width: 650px)": {
      button: {
        width: "23em",
      },
    },
  }));

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const users = { email, password };
    if (users) {
      try {
        const response = await fetch(
          "https://tracker-issue.herokuapp.com/accounts/login",
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
          auth.login(
            responseData.userId,
            responseData.token,
            responseData.isAdmin
          );
          navigate("/");
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
          <Typography variant="h4">Log In</Typography>
        </div>
        <div className={Styles.formContainer}>
          <form onSubmit={submitHandler}>
            <div>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </div>
            <div className={Styles.loginText}>
              <h2>Doesn't have account ?</h2>
              <Link to="/auth/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LogIn;
