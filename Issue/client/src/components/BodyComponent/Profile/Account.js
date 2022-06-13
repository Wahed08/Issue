import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../Auth/auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "./Profile.module.css";
import ErrorModal from "../ShowError/ErrorModal";

const Account = () => {
  const useStyles = makeStyles((theme) => ({
    btn: {
      marginTop: "20px",
    },
  }));

  const [user, setUser] = useState();
  const [error, setError] = useState();
  const { uid } = useParams();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const uId = (uid === auth.userId) && uid;

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const userData = await fetch(
          `https://tracker-issue.herokuapp.com/api/accounts/${uId}/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        const responseUserData = await userData.json();
        setUser(responseUserData.user);

        if (!userData.ok) {
          setError(responseUserData.message);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    };
    fetchUser();
  }, [uId, auth]);

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className={Styles.profileBody}>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <div className="userData">
            {user && (
              <section>
                <Typography variant="h5">Name : {user.name}</Typography>
                <Typography variant="h5">Email : {user.email}</Typography>

                <Link to={`/${uId}/profile`}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                  >
                    Check Profile
                  </Button>
                </Link>
              </section>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Account;
