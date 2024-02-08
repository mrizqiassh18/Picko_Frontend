import React, { useState, useEffect } from "react";
import "../../styles.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LandingPage = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Daftar gambar background
  const backgroundImages = ["bg-1.jpg", "bg-2.jpg", "bg-3.jpg", "bg-4.jpg"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Ganti gambar background setiap beberapa detik (misalnya, setiap 5 detik)
      setBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    // Membersihkan interval setelah komponen dilepas (unmounted)
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();
  const { userId, role, name } = useAuth().state;

  const handleLoginRegisterClick = () => {
    // Navigasi ke halaman register
    navigate("/login"); // Ganti dengan rute halaman register Anda
  };
  const handleLogout = () => {
    // Hapus token dari penyimpanan lokal
    localStorage.removeItem("token");

    // Redirect ke halaman login atau landing page
    window.location.reload();
  };

  return (
    <div
      className="landing-page min-h-screen flex items-center justify-center bg-cover bg-center transition-background-opacity duration-1000"
      style={{
        backgroundImage: `url(/images/${backgroundImages[backgroundIndex]})`,
      }}
    >
      <div className="overlay bg-black bg-opacity-50 w-full h-screen flex items-center justify-center py-10">
        <div className="content text-white text-center">
          <div className="title text-6xl mb-4">Mudahnya Promosi</div>
          <div className="motto text-lg mb-8">
            Dengan Pick'O mencari influencer untuk promosi menjadi mudah
          </div>
          {userId ? (
            // Jika pengguna sudah login
            <div className="user-info">
              <p className="mb-4">Hello, {name}!</p>
              <div className="flex justify-center gap-3">
                <button
                  className="bg-yellow text-white h-10 w-40 hover:bg-dark-yellow rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                {/* Tambahkan tombol khusus untuk role admin atau influencer */}
                {role === "admin" && (
                  <div className="bg-yellow text-white h-10 w-40 flex justify-center items-center hover:bg-dark-yellow rounded">
                  <Link to="/admin/account-control">Account Control</Link>
                  </div>
                )}
                {role === "influencer" && (
                  <div className="bg-yellow text-white h-10 w-40 flex justify-center items-center hover:bg-dark-yellow rounded">
                    <Link to={`/influencer/edit-data/${userId}`}>
                      Edit Your Data
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Jika pengguna belum login
            <>
              <div className="cta-buttons space-x-4 mb-8">
                <button
                  className="bg-yellow hover:bg-dark-yellow text-white px-4 py-2 rounded"
                  onClick={handleLoginRegisterClick}
                >
                  Login/Register
                </button>
                <button className="bg-yellow hover:bg-dark-yellow text-white px-4 py-2 rounded" onClick={() => navigate('/home')}>
                  List Influencer
                </button>
              </div>
              <div className="home-button">
                <button className="bg-transparent border-white border-2 hover:bg-black hover:bg-opacity-50 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
                  Help
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
