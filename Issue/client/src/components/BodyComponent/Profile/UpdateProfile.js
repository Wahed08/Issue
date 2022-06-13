import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TextField, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../ShowError/ErrorModal";
import { AuthContext } from "../../Auth/auth-context";
import Styles from "./UpdateProfile.module.css";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [school, setSchool] = useState("");
  const [nid, setNid] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [libraryId, setLibraryId] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { uid } = useParams();
  const auth = useContext(AuthContext);
  const uId = (uid === auth.userId) && uid;

  const submitHandler = async (e) => {
    e.preventDefault();

    const profile = {
      fullName,
      designation,
      department,
      school,
      nid,
      bloodGroup,
      phoneNumber,
      email,
      libraryId,
      profileLink,
    };
    if (profile) {
      try {
        const response = await fetch(
          `https://tracker-issue.herokuapp.com/accounts/${uId}/update-profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
            body: JSON.stringify(profile),
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          setError(responseData.message);
        }
        if (response.ok) {
          navigate(`/${auth.userId}/profile`);
        }
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      {uId && (
        <div className={Styles.profileContainer}>
          <div className={Styles.profileName}>
            <Typography variant="h4">Update Profile</Typography>
          </div>
          <div className={Styles.textfiledContainer}>
            <form onSubmit={submitHandler}>
              <div>
                <TextField
                  type="text"
                  label="Fullname"
                  variant="outlined"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  label="Designation"
                  variant="outlined"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  label="Department"
                  variant="outlined"
                  value={department}
                  required
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  label="School"
                  variant="outlined"
                  value={school}
                  required
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="NID"
                  variant="outlined"
                  value={nid}
                  required
                  onChange={(e) => setNid(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  label="Blood Group"
                  variant="outlined"
                  value={bloodGroup}
                  required
                  onChange={(e) => setBloodGroup(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Library ID"
                  variant="outlined"
                  value={libraryId}
                  required
                  onChange={(e) => setLibraryId(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  label="Profile Link"
                  variant="outlined"
                  value={profileLink}
                  required
                  onChange={(e) => setProfileLink(e.target.value)}
                />
              </div>
              <div className={Styles.button}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
