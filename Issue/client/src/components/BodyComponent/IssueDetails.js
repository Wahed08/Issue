import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/auth-context";
import ErrorModal from "./ShowError/ErrorModal";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./IssueDetails.css";

const IssueDetails = () => {
  const useStyles = makeStyles((theme) => ({
    header: {},
    details: {},
    status: {
      marginTop: "0.4em",
      marginLeft: "48em",
    },
  }));

  const classes = useStyles();
  const [issue, setIssue] = useState();
  const [error, setError] = useState();
  let { pid } = useParams();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/${pid}/issue-details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const responseData = await response.json();
        setIssue(responseData.Issue);

        if (!response.ok) {
          setError(responseData.message);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchIssue();
  }, [pid, auth]);

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className="main-issue">
        <div className="issue-header">
          <div>
            <Typography variant="h5" className={classes.header}>
              About Issue
            </Typography>
          </div>
          <div>
            {issue && (
              <Typography variant="body1" className={classes.status}>
                Issue status: {issue.status}
              </Typography>
            )}
          </div>
        </div>

        <div className="issue-details">
          {issue && (
            <Typography variant="body1" className={classes.details}>
              Issue details: {issue.description}
            </Typography>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default IssueDetails;
