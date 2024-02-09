import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const AuthGuard = ({ children }) => {
  const { userId, role } = useAuth().state;
  const navigate = useNavigate();

  useEffect(() => {
    // Jika user sudah login, redirect sesuai peran (role)
    if (userId) {
      if (role === "admin") {
        // Redirect ke halaman admin account control
        navigate("/admin/account-control");
      } else if (role === "influencer") {
        // Redirect ke halaman edit data influencer
        navigate(`/influencer/edit-data/${userId}`);
      }
    }
  }, [userId, role, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
