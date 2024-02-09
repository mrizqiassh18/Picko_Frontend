import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import helpData from "../../data/helpData.js";
import HelpCard from "../../components/HelpCard.jsx";

const HelpPage = () => {
  console.log(helpData);
  const navigate = useNavigate();

  // Daftar gambar background
  const [backgroundIndex, setBackgroundIndex] = useState(0);
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

  const { userId, role, name } = useAuth().state;

  return (
    <>
      <nav className="bg-yellow p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 p-4 transition-all">
        <div className="container mx-auto">
          {/* Tambahkan logo di sini */}
          <span className="logo text-white font-bold text-lg text-4xl ml-4">
            Pick'O
          </span>
        </div>
        {userId ? (
          <div className="flex gap-2 w-200 items-center">
            <p className="w-28 text-white font-semibold">Hello, {name}!</p>
            <button
              className="bg-yellow text-white h-10 w-20 hover:bg-dark-yellow hover:rounded font-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex">
            <button
              className="bg-yellow hover:bg-dark-yellow text-white px-4 py-2 hover:rounded font-semibold"
              onClick={handleLoginRegisterClick}
            >
              Login / Register
            </button>
          </div>
        )}
        {userId && role === "admin" && (
          <div className="bg-yellow text-white h-10 w-40 flex justify-center items-center hover:bg-dark-yellow font-semibold hover:rounded">
            <Link to="/admin/account-control">Account Control</Link>
          </div>
        )}
        {userId && role === "influencer" && (
          <div className="bg-yellow text-white h-10 w-40 flex justify-center items-center hover:bg-dark-yellow font-semibold hover:rounded">
            <Link to={`/influencer/edit-data/${userId}`}>Edit Your Data</Link>
          </div>
        )}
      </nav>

      <div className="top">
        <div
          className="jumbotron h-96 flex items-center justify-center bg-cover bg-center transition-background-opacity duration-1000 mt-16"
          style={{
            backgroundImage: `url(/images/${backgroundImages[backgroundIndex]})`,
          }}
        >
          <div className="overlay bg-black bg-opacity-50 w-full h-96 flex items-center flex-col justify-center py-10">
            <div className="content text-white text-center">
              <div className="title text-6xl mb-4">Bagaimana Cara Menggunakan Pick'O?</div>
            </div>
            <div className="influencers-list-button mt-6">
              <button className="bg-transparent border-white border-2 hover:bg-black hover:bg-opacity-50 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600" onClick={() => navigate('/')}>
                Back to Influencer List
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom mt-20">
        <div className="step flex items-center justify-center gap-32">
          {helpData.map((data) => (
            <HelpCard key={data.step} data={data} />
            ))}
        </div>
      </div>
    </>
  );
};

export default HelpPage;
