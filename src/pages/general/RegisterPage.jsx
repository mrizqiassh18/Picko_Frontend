import React, { useState, useEffect } from 'react';
import RegisterForm from '../../components/RegisterForm';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

  const navigate = useNavigate();
  const { userId, role } = useAuth().state;

  if (userId) {
    if (role === "admin") {
      navigate("/admin/account-control");
    } else if (role === "influencer") {
      navigate(`/influencer/edit-data/${userId}`);
    }
    return null;
  }

  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const totalImages = 4; // Sesuaikan dengan jumlah gambar yang Anda miliki


  return (
    <div className="min-h-screen flex">
      <div className="form-container flex flex-1 p-10 items-center">
        <RegisterForm />
      </div>
      <div
        className="background-image flex-1 bg-cover bg-center transition-background-opacity duration-1000"
        style={{
          backgroundImage: `url(/images/bg-${backgroundIndex + 1}.jpg)`,
        }}
      />
    </div>
  );
};

export default RegisterPage;
