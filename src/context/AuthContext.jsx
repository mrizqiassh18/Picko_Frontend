// src/context/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  userId: null,
  role: null,
  name: null,
  status: null,
  token: localStorage.getItem("token") || null,
};

const init = async () => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    try {
      // Mendekode token untuk mendapatkan informasi
      const decodedToken = jwtDecode(storedToken);

      // Mengambil data dari backend berdasarkan userId
      const userData = await fetchUserData(decodedToken.userId);

      return {
        ...initialState,
        token: storedToken,
        userId: decodedToken.userId,
        role: userData.role,
        name: userData.name,
        status: userData.status,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return {
    ...initialState,
    token: storedToken || null,
  };
};

const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`https://picko-backend.vercel.app/user/${userId}`);
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const newState = {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        role: action.payload.role,
        name: action.payload.name,
        status: action.payload.status,
      };

      // Simpan token ke localStorage saat login
      localStorage.setItem("token", newState.token);

      return newState;

    case "LOGOUT":
      // Hapus token dari localStorage saat logout
      localStorage.removeItem("token");
      return initialState;

    case "INIT":
      // Kasus INIT
      return action.payload;

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, init);

  useEffect(() => {
    // Panggil fungsi init di sini jika diperlukan
    const initialize = async () => {
      const initializedState = await init();
      dispatch({ type: "INIT", payload: initializedState });
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, init }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, init };
