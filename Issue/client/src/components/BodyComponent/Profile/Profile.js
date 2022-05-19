import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Profile.css";

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
  }));

  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const { uid } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profileData = await fetch(
          `http://localhost:5000/api/accounts/${uid}/profile`
        );
        const userData = await fetch(
          `http://localhost:5000/api/accounts/${uid}/user`
        );
        const responseProfileData = await profileData.json();
        const responseUserData = await userData.json();

        setProfile(responseProfileData.userProfile);
        setUser(responseUserData.user);

        if (!profileData.ok) {
          throw new Error(responseProfileData.message);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchUser();
  }, [uid]);

  return (
    <React.Fragment>
      <div className="profile-body">
        <div className="userData">
          {user && (
            <section>
              <Typography variant="h5">Name : {user.name}</Typography>
              <Typography variant="h5">Email : {user.email}</Typography>
            </section>
          )}
        </div>
        <div className="items">
          {profile && (
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
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
