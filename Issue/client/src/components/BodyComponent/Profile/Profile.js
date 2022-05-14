import React, { useState } from "react";
import { TextField, Typography, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {

  return (
    <div className="main_container">
      <div className="profile_name">
        <Typography variant="h4">Update Profile</Typography>
      </div>
      <div className="profile_container">
        <form>
          <div>
            <TextField
              type="text"
              label="Fullname"
              variant="outlined"
              required
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Designation"
              variant="outlined"
              required
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Department"
              variant="outlined"
              required
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="School"
              variant="outlined"
      
              required
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="number"
              label="NID"
              variant="outlined"
          
              required
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Blood Group"
              variant="outlined"
              required
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="number"
              label="Phone Number"
              variant="outlined"
              required
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              required
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="number"
              label="Library ID"
              variant="outlined"
              required
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Profile Link"
              variant="outlined"
              required
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
