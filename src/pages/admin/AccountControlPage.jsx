import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminAccountControl from "../../components/AdminAccountControl";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

const AccountControlPage = () => {
  const [influencers, setInfluencers] = useState([]);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/influencers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setInfluencers(response.data.getInfluencers);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      // Menampilkan peringatan menggunakan sweetalert2
      const result = await Swal.fire({
        title: 'Approve Influencer',
        text: 'Apakah Anda yakin ingin menyetujui influencer ini?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        // Kirim permintaan ke backend untuk menyetujui influencer
        await axios.put(
          `http://localhost:5000/api/admin/approve-influencer/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Menampilkan alert sukses
        Swal.fire('Approved!', 'Influencer has been approved.', 'success');

        // Perbarui status influencer secara lokal
        setInfluencers((prevInfluencers) =>
          prevInfluencers.map((influencer) =>
            influencer._id === id ? { ...influencer, status: 'approved' } : influencer
          )
        );
      }
    } catch (error) {
      console.error("Error approving influencer:", error);
      // Menampilkan alert error
      Swal.fire('Error!', 'Failed to approve influencer.', 'error');
    }
  };

  const handleDisable = async (id) => {
    try {
      // Menampilkan peringatan menggunakan sweetalert2
      const result = await Swal.fire({
        title: 'Disable Influencer',
        text: 'Apakah Anda yakin ingin menonaktifkan influencer ini?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, disable it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        // Kirim permintaan ke backend untuk menonaktifkan influencer
        await axios.put(
          `http://localhost:5000/api/admin/disable-influencer/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Menampilkan alert sukses
        Swal.fire('Disabled!', 'Influencer has been disabled.', 'success');

        // Perbarui status influencer secara lokal
        setInfluencers((prevInfluencers) =>
          prevInfluencers.map((influencer) =>
            influencer._id === id ? { ...influencer, status: 'disabled' } : influencer
          )
        );
      }
    } catch (error) {
      console.error("Error disabling influencer:", error);
      // Menampilkan alert error
      Swal.fire('Error!', 'Failed to disable influencer.', 'error');
    }
  };

  return (
    
    <div>
      <Navbar />

      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-8">Admin | Account Control</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((influencer) => (
            <AdminAccountControl
              key={influencer._id}
              influencer={influencer}
              onApprove={handleApprove}
              onDisable={handleDisable}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountControlPage;
