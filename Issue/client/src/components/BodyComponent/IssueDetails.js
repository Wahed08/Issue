import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/auth-context";
import ErrorModal from "./ShowError/ErrorModal";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "./IssueDetails.module.css";

const IssueDetails = () => {
  const useStyles = makeStyles((theme) => ({
    status: {
      fontWeight: "bold",
    },
    btn: {
      marginRight: "0.5em",
    },
  }));

  const classes = useStyles();
  const [issue, setIssue] = useState();
  const [error, setError] = useState();
  let { pid } = useParams();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchIssue = async () => {
      try {
        const response = await fetch(
          `/api/posts/${pid}/issue-details`,
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
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    };
    fetchIssue();
  }, [pid, auth]);

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className={Styles.mainIssue}>
        {isLoading && <CircularProgress />}
        <div className={Styles.issueHeader}>
          <div>
            <Typography variant="h5">About Issue</Typography>
          </div>
          <div>
            {issue && (
              <Typography variant="body1" className={classes.status}>
                Issue status: {issue.status}
              </Typography>
            )}
          </div>
        </div>

        <div className={Styles.issueDetails}>
          {issue && (
            <Typography variant="body1">
              <Typography variant="h5">Issue details: </Typography>
              {issue.description}
            </Typography>
          )}

          {issue && issue.creatorId === auth.userId && (
            <div className={Styles.button}>
              <Link to={`/${issue._id}/edit-issue`}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  className={classes.btn}
                >
                  Edit
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default IssueDetails;
