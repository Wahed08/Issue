import React, { useState, useEffect, useContext } from "react";
import IssueBody from "../BodyComponent/IssueBody";

const IssuesList = () => {

  return (
    <React.Fragment>
     <div>
        <IssueBody admin="admin"/>
     </div>
    </React.Fragment>
  );
};

export default IssuesList;
