// RegisterPage.jsx

import React, { useState, useEffect } from 'react';
import RegisterForm from '../../components/RegisterForm';


const RegisterPage = () => {
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
      <div className="form-container flex-1 p-10">
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
