import React, { useContext, useState } from "react";
import { TextField, Typography, Button, ButtonGroup } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { makeStyles } from "@material-ui/core/styles";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
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
          "http://localhost:5000/api/accounts/login",
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
          console.log(responseData.token);
          auth.login(responseData.userId, responseData.token);
          navigate("/issue");
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
      <div className="main-container">
        <form onSubmit={submitHandler}>
          <div className="form-container">
            <div className="sign-up">
              <Typography variant="h4">Log In</Typography>
            </div>
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
          <h2>Doesn't have account?</h2>
          <Button
            variant="text"
            color="primary"
            className={classes.loginButton}
          >
            <Link to="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LogIn;
