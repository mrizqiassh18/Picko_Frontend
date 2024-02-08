import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    const handleLogout = () => {
        // Hapus token dari penyimpanan lokal
        localStorage.removeItem("token");
    
        dispatch({
          type: 'LOGOUT',
        });
    
        // Redirect ke halaman login atau landing page
        navigate("/");
        window.location.reload();
        
      };
    return (
        <nav className="bg-yellow p-4 flex justify-between items-center">
        <div className="container mx-auto">
          {/* Tambahkan logo di sini */}
          <span className="logo text-white font-bold text-lg text-4xl">Pick'O</span>
        </div>
        <div>
          {/* Tombol Logout dan Kembali ke Landing Page */}
          <button
            onClick={handleLogout}
            className="text-white hover:text-dark-grey py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 font-medium"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-dark-grey py-2 px-4 rounded focus:outline-none focus:shadow-outline font-medium"
          >
            Back to Landing Page
          </button>
        </div>
      </nav>
    );
}

export default Navbar;