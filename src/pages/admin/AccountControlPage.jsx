import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminAccountControl from "../../components/AdminAccountControl";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar";

const AccountControlPage = () => {
  const [influencers, setInfluencers] = useState([]);
  const [filter, setFilter] = useState({
    status: "",
    name: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterParams = { ...filter, searchTerm };

        Object.keys(filterParams).forEach((key) => {
          if (!filterParams[key]) {
            delete filterParams[key];
          }
        });

        const response = await axios.get(
          "https://picko-backend.vercel.app/api/admin/influencers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: filterParams,
          }
        );
        setInfluencers(response.data.getInfluencers);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      }
    };

    fetchData();
  }, [filter, searchTerm]);

  const handleApprove = async (id) => {
    try {
      // Menampilkan peringatan menggunakan sweetalert2
      const result = await Swal.fire({
        title: "Approve Influencer",
        text: "Apakah Anda yakin ingin menyetujui influencer ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        // Kirim permintaan ke backend untuk menyetujui influencer
        await axios.put(
          `https://picko-backend.vercel.app/api/admin/approve-influencer/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Menampilkan alert sukses
        Swal.fire("Approved!", "Influencer has been approved.", "success");

        // Perbarui status influencer secara lokal
        setInfluencers((prevInfluencers) =>
          prevInfluencers.map((influencer) =>
            influencer._id === id
              ? { ...influencer, status: "approved" }
              : influencer
          )
        );
      }
    } catch (error) {
      console.error("Error approving influencer:", error);
      // Menampilkan alert error
      Swal.fire("Error!", "Failed to approve influencer.", "error");
    }
  };

  const handleDisable = async (id) => {
    try {
      // Menampilkan peringatan menggunakan sweetalert2
      const result = await Swal.fire({
        title: "Disable Influencer",
        text: "Apakah Anda yakin ingin menonaktifkan influencer ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, disable it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        // Kirim permintaan ke backend untuk menonaktifkan influencer
        await axios.put(
          `https://picko-backend.vercel.app/api/admin/disable-influencer/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Menampilkan alert sukses
        Swal.fire("Disabled!", "Influencer has been disabled.", "success");

        // Perbarui status influencer secara lokal
        setInfluencers((prevInfluencers) =>
          prevInfluencers.map((influencer) =>
            influencer._id === id
              ? { ...influencer, status: "disabled" }
              : influencer
          )
        );
      }
    } catch (error) {
      console.error("Error disabling influencer:", error);
      // Menampilkan alert error
      Swal.fire("Error!", "Failed to disable influencer.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete Influencer",
        text: "Are you sure you want to delete this influencer?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://picko-backend.vercel.app/api/admin/delete-influencer/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setInfluencers((prevInfluencers) =>
          prevInfluencers.filter((influencer) => influencer._id !== id)
        );

        Swal.fire("Deleted!", "Influencer has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting influencer:", error);
      Swal.fire("Error!", "Failed to delete influencer.", "error");
    }
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchStatus = influencer.status
      .toLowerCase()
      .includes(filter.status.toLowerCase());
    const matchName = influencer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchStatus && matchName;
  });

  return (
    <div>
      <Navbar />
      <div className="sticky top-16 z-10 bg-white p-4">
        <div className="flex items-center space-x-4 mb-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name"
            className="border p-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Status Dropdown */}
          <select
            className="border p-2 rounded"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="disabled">Disabled</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto mt-14">
        <h1 className="text-2xl font-bold mb-8">Admin | Account Control</h1>
        {filteredInfluencers.length === 0 ? (
          <div className="no-influencer flex items-center justify-center mt-10">
            <h2 className="text-2xl font-semibold">No influencers found.</h2>
            </div>
          
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInfluencers.map((influencer) => (
              <AdminAccountControl
                key={influencer._id}
                influencer={influencer}
                onApprove={handleApprove}
                onDisable={handleDisable}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountControlPage;
