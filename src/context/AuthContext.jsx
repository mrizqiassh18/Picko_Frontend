// src/context/AuthContext.js
import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  userId: null,
  token: localStorage.getItem("token") || null,
  role: null,
  name : null,
  status: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userId: action.payload.userId,
          token: action.payload.token,
          role: action.payload.role,
          name: action.payload.name,
          status: action.payload.status
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
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

export { AuthProvider, useAuth };
