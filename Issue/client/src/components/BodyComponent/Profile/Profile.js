import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Profile.css";

const Profile = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom:"1.5em",
      color:"red"
    },
    contact:{
      color: "green",
      marginTop:"1.5em",
    },
    bottom:{
      marginBottom:"6em",
    }
   
  }));

  const [user, setUser] = useState();
  const { uid } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetch(
          `http://localhost:5000/api/accounts/${uid}/profile`
        );
        const responseData = await userData.json();
        setUser(responseData.userProfile);
        if (!userData.ok) {
          throw new Error(responseData.message);
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
        <div className="heading">
          {/* <Typography variant="h4">Profile Details</Typography> */}
        </div>
        <div className="items">
          {user && (
            <section>
              <Typography variant="h4" className={classes.root}>Faculty Profile</Typography>

              <Typography variant="h5">{user.fullName}</Typography> 
              <Typography variant="body1">{user.designation}</Typography>
              <Typography variant="body1">{user.department} Department</Typography>
              <Typography variant="body1">{user.school}</Typography>

              <Typography variant="h5" className={classes.contact}>Contact Information</Typography>
              
              <Typography variant="body1">NID : {user.nid}</Typography>
              <Typography variant="body1">Phone Number : {user.phoneNumber}</Typography>
              <Typography variant="body1">Email : {user.email}</Typography>

              <Typography variant="h5" className={classes.contact}>More Details</Typography>

              <Typography variant="body1">Blood Group : {user.bloodGroup}</Typography>
              <Typography variant="body1">Library Id:  {user.libraryId}</Typography>
              <Typography variant="body1" className={classes.bottom}>Profile Link : <Link to="">{user.profileLink}</Link></Typography>
             </section>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
