import React, { Fragment, useCallback, useState, useEffect, Profiler } from "react";
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
import UpdateProfile from "./components/BodyComponent/Profile/UpdateProfile";
import Account from "./components/BodyComponent/Profile/Account";
import Profile from "./components/BodyComponent/Profile/Profile";
import UsersList from "./components/Admin/UsersList";
import IssuesList from "./components/Admin/IssuesList";

const App = () => {

  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((uid, token, isAdmin) => {
    setToken(token);
    setUserId(uid);
    setIsAdmin(isAdmin);

    localStorage.setItem("Data", JSON.stringify({ userId: uid, token: token, isAdmin: isAdmin}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAdmin(null);
    localStorage.removeItem("Data");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Data"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token, storedData.isAdmin);
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/create-issue" element={<CreateIssue />}></Route>
        <Route path="/" element={<IssueBody />}></Route>
        <Route path="/:uid/update-profile" element={<UpdateProfile />}></Route>
        <Route path="/:uid/account" element={<Account />}></Route>
        <Route path="/:uid/profile" element={<Profile />}></Route>
        <Route path="/admin/users-list" element={<UsersList />}></Route>
        <Route path="/admin/issues-list" element={<IssuesList />}></Route>
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
        isAdmin: isAdmin,
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
