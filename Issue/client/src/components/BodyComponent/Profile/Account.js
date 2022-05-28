import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {AuthContext} from "../../Auth/auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "./Profile.module.css";

const Account = () => {
  const useStyles = makeStyles((theme) => ({
    btn: {
      marginTop: "20px",
    },
  }));

  const [user, setUser] = useState();
  const { uid } = useParams();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const userData = await fetch(
          `http://localhost:5000/api/accounts/${uid}/user`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        const responseUserData = await userData.json();
        setUser(responseUserData.user);

        if (!userData.ok) {
          throw new Error(responseUserData.message);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    };
    fetchUser();
  }, [uid, auth]);

  return (
    <React.Fragment>
      <div className={Styles.profileBody}>
        {isLoading && <CircularProgress/>}
        {!isLoading && <div className="userData">
          {user && (
            <section>
              <Typography variant="h5">Name : {user.name}</Typography>
              <Typography variant="h5">Email : {user.email}</Typography>

              <Link to={`/${user._id}/profile`}>
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
        </div>}
      </div>
    </React.Fragment>
  );
};

export default Account;