import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
// import { AuthContext } from "../../Auth/auth-context";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  const { uid } = useParams();

  useEffect(() => {
    // const ac = new AbortController();
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
      //   return ac.abort();
    };
    fetchUser();
  }, [uid]);

  return (
    <React.Fragment>
      <div className="profile-body">
        <div className="heading">
          <Typography variant="h4">Profile Details</Typography>
        </div>
        <div>
          {user && (
            <ul>
              <li>Full Name: {user.fullName}</li>
              <li>Designation: {user.designation}</li>
              <li>Department: {user.department}</li>
              <li>School: {user.school}</li>
              <li>NID: {user.nid}</li>
              <li>Blood Group: {user.bloodGroup}</li>
              <li>Phone Number: {user.phoneNumber}</li>
              <li>Email: {user.email}</li>
              <li>Library Id: {user.libraryId}</li>
              <li>Profile Link: {user.profileLink}</li>
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
