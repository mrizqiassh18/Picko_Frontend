import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const {name} = useAuth().state;

  const handleLogout = () => {
    // Hapus token dari penyimpanan lokal
    localStorage.removeItem("token");

    dispatch({
      type: "LOGOUT",
    });

    // Redirect ke halaman login atau landing page
    navigate("/");
    window.location.reload();
  };
  return (
    <nav className="bg-yellow p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 p-4 transition-all">
      <div className="container mx-auto">
        {/* Tambahkan logo di sini */}
        <span className="logo text-white font-bold text-lg text-4xl ml-4">
          Pick'O
        </span>
      </div>
      <div className="flex w-100 items-center">
      <p className="w-28 text-white font-semibold">Hello, {name}!</p>
        {/* Tombol Logout dan Kembali ke Landing Page */}
        <button
          onClick={handleLogout}
          className="text-white hover:bg-dark-yellow py-2 px-4 rounded focus:outline-none focus:shadow-outline font-medium font-semibold"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-white hover:bg-dark-yellow py-2 px-4 rounded focus:outline-none focus:shadow-outline font-medium font-semibold w-48"
        >
          Back to Influencer List
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
