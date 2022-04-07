import React from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import "./SignUp.css";

const SignUp = () => {
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
            style={{
              width: "30%",
              paddingBottom: "20px",
            }}
            required
          />
          <TextField
            type="email"
            label="Email"
            style={{
              width: "30%",
              paddingBottom: "20px",
            }}
            required
          />
          <TextField
            type="password"
            label="Password"
            style={{
              width: "30%",
              paddingBottom: "20px",
            }}
            required
          />
          <TextField
            type="password"
            label="Confirm Password"
            style={{
              width: "30%",
              paddingBottom: "20px",
            }}
            required
          />
        </div>

        <div className="button-container">
          <Button variant="contained" color="secondary" style={{
            marginRight: "20px",
          }}>Cancel</Button>
          <Button variant="contained" color="primary">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
