import React, { Fragment, useCallback, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import IssueBody from "./components/BodyComponent/IssueBody";
import CreateIssue from "./components/BodyComponent/CreateIssue";
import SignUp from "./components/Auth/SignUp";
import LogIn from "./components/Auth/LogIn";
import LandingPage from "./components/LandingPage/LandingPage";
import ProvideOtp from "./components/Auth/ProvideOtp";
import { AuthContext } from "./components/Auth/auth-context";

const App = () => {
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);

    localStorage.setItem("Data", JSON.stringify({ userId: uid, token: token }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("Data");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Data"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/create_issue" element={<CreateIssue />}></Route>
        <Route path="/" element={<IssueBody />}></Route>
        {/* <Route path="/" element={<LandingPage />}></Route> */}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<IssueBody />}></Route>
        <Route path="/auth/signup" element={<SignUp />}></Route>
        <Route path="/auth/:uid/verify-email" element={<ProvideOtp />}></Route>
        <Route path="/auth/login" element={<LogIn />}></Route>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div>
        <Header />
        <main>{routes}</main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
