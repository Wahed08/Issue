import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../Auth/auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "./Profile.module.css";
import ErrorModal from "../ShowError/ErrorModal";

const Profile = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: ".75em",
      color: "red",
    },
    contact: {
      color: "green",
      marginTop: "1.5em",
    },
    bottom: {
      marginBottom: "6em",
    },
    btn: {
      marginTop: "20px",
    },
  }));

  const [profile, setProfile] = useState();
  const [error, setError] = useState();
  const { uid } = useParams();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const uId = auth.userId === uid && uid;

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const profileData = await fetch(
          `http://localhost:5000/api/accounts/${uId}/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const responseProfileData = await profileData.json();
        setProfile(responseProfileData.userProfile);

        if (!profileData.ok) {
          setError(responseProfileData.message);
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
          <div className={Styles.items}>
            {profile ? (
              <section>
                <Typography variant="h4" className={classes.root}>
                  Faculty Profile
                </Typography>

                <Typography variant="h5">{profile.fullName}</Typography>
                <Typography variant="body1">{profile.designation}</Typography>
                <Typography variant="body1">
                  {profile.department} Department
                </Typography>
                <Typography variant="body1">{profile.school}</Typography>

                <Typography variant="h5" className={classes.contact}>
                  Contact Information
                </Typography>

                <Typography variant="body1">NID : {profile.nid}</Typography>
                <Typography variant="body1">
                  Phone Number : {profile.phoneNumber}
                </Typography>
                <Typography variant="body1">Email : {profile.email}</Typography>

                <Typography variant="h5" className={classes.contact}>
                  More Details
                </Typography>

                <Typography variant="body1">
                  Blood Group : {profile.bloodGroup}
                </Typography>
                <Typography variant="body1">
                  Library Id: {profile.libraryId}
                </Typography>
                <Typography variant="body1" className={classes.bottom}>
                  Profile Link : <Link to="">{profile.profileLink}</Link>
                </Typography>
              </section>
            ) : (
              uId && (
                <section>
                  <Typography variant="h4">
                    Didn't update profile yet!
                  </Typography>
                  <Link to={`/${uId}/update-profile`}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.btn}
                    >
                      Update Profile
                    </Button>
                  </Link>
                </section>
              )
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Profile;
