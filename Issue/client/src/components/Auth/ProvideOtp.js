import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Typography, Button } from "@material-ui/core";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import { makeStyles } from "@material-ui/core/styles";
import "./ProvideOtp.css";

const ProvideOtp = () => {
  const useStyles = makeStyles((theme) => ({
    textFiled: {
      paddingBottom: "20px",
    },
  }));

  const classes = useStyles();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const uid = useParams().userId;

  const submitHandler = async (e) => {
    e.preventDefault();

    const OTP = { otp };
    if (OTP) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/accounts/${uid}/verify-email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(OTP),
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          setError(responseData.message);
        }
        if (response.ok) {
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
      <div className="parent">
          <div className="child-1">
            <Typography variant="h4">Provide a 4-digit OTP</Typography>
          </div>
          <div className="child-2">
            <form onSubmit={submitHandler}>
              <div className="form-container">
                <TextField
                  type="number"
                  label="OTP"
                  className={classes.textFiled}
                  required
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="button-container">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </div>
      </div>
    </React.Fragment>
  );
};

export default ProvideOtp;
