import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import IssueBody from "./components/BodyComponent/IssueBody";
import CreateIssue from "./components/BodyComponent/CreateIssue";
import SignUp from "./components/Auth/SignUp";
import LogIn from "./components/Auth/LogIn";
import LandingPage from "./components/LandingPage/LandingPage";

const App = () => {
  let routes = (
    <Routes>
      <Route path="/create_issue" element={<CreateIssue />}></Route>
      <Route path="/issue" element={<IssueBody />}></Route>
      <Route path="/auth/signup" element={<SignUp />}></Route>
      <Route path="/auth/login" element={<LogIn />}></Route>
      <Route path="/" element={<LandingPage />}></Route>
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
