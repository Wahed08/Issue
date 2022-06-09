import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Styles from "../BodyComponent/CreateIssue.module.css";
import { AuthContext } from "../Auth/auth-context";
import { Button, makeStyles, TextField } from "@material-ui/core";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import CircularProgress from "@mui/material/CircularProgress";

const EditIssue = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: "15px",
    },
  }));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  let { pid } = useParams();
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
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
        setTitle(responseData.Issue.title);
        setDescription(responseData.Issue.description);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    };
    fetchIssue();
  }, [auth, pid, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const update = { title, description };
    try {
      if (title && description) {
        const response = await fetch(
          `http://localhost:5000/api/posts/${pid}/edit-issue`,
          {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData.message);
        }
        if (response.ok) {
          navigate(`/${responseData.updateIssue._id}/issue-details`);
        }
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className={Styles.container}>
        {isLoading && <CircularProgress />}
        <div className={Styles.title}>
          <h1>Edit An Issue?</h1>
        </div>
        {!isLoading && (
          <div className={Styles.textField}>
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  type="text"
                  name="context"
                  variant="outlined"
                  required
                  placeholder="Please Enter a Context"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  name="details"
                  variant="outlined"
                  multiline
                  rows={5}
                  required
                  placeholder="Please Enter Details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  className={classes.button}
                >
                  Update Issue
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default EditIssue;
