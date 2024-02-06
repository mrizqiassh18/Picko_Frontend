import React, { useState, useEffect } from "react";
import '../../styles.css';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Daftar gambar background
  const backgroundImages = ["bg-1.jpg", "bg-2.jpg", "bg-3.jpg", "bg-4.jpg"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Ganti gambar background setiap beberapa detik (misalnya, setiap 5 detik)
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    // Membersihkan interval setelah komponen dilepas (unmounted)
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();

  const handleLoginRegisterClick = () => {
    // Navigasi ke halaman register
    navigate('/register'); // Ganti dengan rute halaman register Anda
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
          <div className="motto text-lg mb-8">Dengan Pick'O mencari influencer untuk promosi menjadi mudah</div>
          <div className="cta-buttons space-x-4 mb-8">
            <button className="bg-yellow hover:bg-dark-yellow text-white px-4 py-2 rounded" onClick={handleLoginRegisterClick}>
              Login/Register
            </button>
            <button className="bg-yellow hover:bg-dark-yellow text-white px-4 py-2 rounded">
              List Influencer
            </button>
          </div>
          <div className="home-button">
            <button className="bg-transparent border-white border-2 hover:bg-black hover:bg-opacity-50 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
