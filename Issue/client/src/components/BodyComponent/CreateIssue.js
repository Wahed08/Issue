import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../BodyComponent/CreateIssue.css";
import { AuthContext } from "../Auth/auth-context";
import { Button, makeStyles } from "@material-ui/core";

const CreateIssue = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: "15px",
    },
  }));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, description };

    if (title && description) {
      try {
        const response = await fetch("http://localhost:5000/api/posts/create", {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        });
        if (response.ok) {
          navigate("/");
        }
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="title">
          <h1>Create An Issue?</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="context"
            required
            placeholder="Please Enter a Context"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            name="details"
            rows={4}
            required
            placeholder="Please Enter Details..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={classes.button}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
