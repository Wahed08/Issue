import React, { useState, useEffect, useContext } from "react";
import "../BodyComponent/IssueBody.css";
import { AuthContext } from "../Auth/auth-context";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import IssueBody from "../BodyComponent/IssueBody";

const IssuesList = () => {

  return (
    <React.Fragment>
     <div>
        <IssueBody/>
     </div>
    </React.Fragment>
  );
};

export default IssuesList;
