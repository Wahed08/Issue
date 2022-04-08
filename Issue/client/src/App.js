import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import IssueBody from "./components/BodyComponent/IssueBody";
import CreateIssue from "./components/BodyComponent/CreateIssue";
import SignUp from "./components/SignUp/SignUp";

const App = () => {
  let routes = (
    <Routes>
      <Route path="/create_issue" element={<CreateIssue />}></Route>
      <Route path="/" element={<IssueBody />}></Route>
      <Route path="/auth" element={<SignUp />}></Route>
    </Routes>
  );
  return (
    <div>
      <Header />
      <main>{routes}</main>
      <Footer />
    </div>
  );
};

export default App;
