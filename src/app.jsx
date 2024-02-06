import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/general/Landing-Page";
import RegisterPage from "./pages/general/RegisterPage";
import LoginPage from "./pages/general/LoginPage";
import "./index.tailwind.css";
import TransitionWrapper from "../src/components/TransitionWrapper";
import EditProfileForm from "./pages/influencer/EditProfile";

const App = () => {
  const checkLoggedIn = () => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return null; // Pastikan selalu mengembalikan nilai, walaupun null
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TransitionWrapper>
              <LandingPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <TransitionWrapper>
              <RegisterPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <TransitionWrapper>
              <LoginPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/influencer/edit-data/:id"
          element={
            <EditProfileForm />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
