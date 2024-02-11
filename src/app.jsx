import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./pages/general/RegisterPage";
import LoginPage from "./pages/general/LoginPage";
import HelpPage from "./pages/general/HelpPage";
import "./index.tailwind.css";
import TransitionWrapper from "../src/components/TransitionWrapper";
import EditProfileForm from "./pages/influencer/EditProfilePage";
import AccountControlPage from "./pages/admin/AccountControlPage";
import InfluencerList from "./pages/general/InfluencerListPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

const App = () => {
  return (

    <AuthProvider>
      <Router>
        <Routes>
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
              <ProtectedRoute
                element={
                  <TransitionWrapper>
                    <EditProfileForm />
                  </TransitionWrapper>
                }
                role="influencer"
              />
            }
          />
          <Route
            path="/admin/account-control"
            element={
              <ProtectedRoute
                element={
                  <TransitionWrapper>
                    <AccountControlPage />
                  </TransitionWrapper>
                }
                role="admin"
              />
            }
          />
          <Route
            path="/"
            element={
              <TransitionWrapper>
                  <InfluencerList />
              </TransitionWrapper>
            }
          />
          <Route
            path="/help"
            element={
              <TransitionWrapper>
                  <HelpPage />
              </TransitionWrapper>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ element, role }) => {
  const { state, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Jika user belum login atau rolenya tidak sesuai, redirect ke halaman login
  if (!state.userId || (role && state.role !== role)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default App;
