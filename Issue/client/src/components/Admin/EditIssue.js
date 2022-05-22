import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../BodyComponent/CreateIssue.css";
import { AuthContext } from "../Auth/auth-context";
import { Button, makeStyles } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";

const EditIssue = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: "15px",
    },
    field: {
      display: "flex",
      justifyContent:"center",
      alignItems: "center",
    },
  }));

  const [status, setStatus] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const classes = useStyles();
  let { pid } = useParams();

  // edit handler
  const editHandler = async (e) => {
    e.preventDefault();
    const value = { status };
    try {
      if (value) {
        const response = await fetch(
          `http://localhost:5000/api/posts/admin/${pid}/edit-issue`,
          {
            method: "PATCH",
            body: JSON.stringify(value),
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
          navigate("/admin/issues-list");
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
      <div className="section">
        <div className="container">
          <div className="title">
            <h1>Update Status</h1>
          </div>
          <form onSubmit={editHandler}>
            {/* <input
              type="text"
              name="status"
              required
              placeholder="Please Enter status"
              onChange={(e) => setStatus(e.target.value)}
            /> */}
            <FormControl className={classes.field} required>
              <RadioGroup
                defaultValue="Pending"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <FormControlLabel
                  value="Pending"
                  control={<Radio />}
                  label="Pending"
                />
                <FormControlLabel
                  value="Processing"
                  control={<Radio />}
                  label="Processing"
                />
                <FormControlLabel
                  value="Finished"
                  control={<Radio />}
                  label="Finished"
                />
              </RadioGroup>
            </FormControl>
            <div className={classes.button}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditIssue;
