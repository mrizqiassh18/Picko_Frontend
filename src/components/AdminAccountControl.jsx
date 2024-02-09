// src/components/InfluencerCard.js
import React from "react";

const AdminAccountControl = ({ influencer, onApprove, onDisable }) => {
  return (
    <div className="profile-card border-white40 flex w-full max-w-md flex-col items-center rounded-lg border bg-white p-8 shadow-lg mb-10">
      <div className="image relative h-70 w-25 flex items-center">
        <img
          className="object-cover rounded-lg h-36 w-40"
          src={influencer.profile_photo}
          alt="influencer-photo"
        />
      </div>
      <div className="data mt-4 text-center">
        <h2 className="text-2xl font-semibold">{influencer.name}</h2>
        <div className="flex gap-2 justify-center">
          <span className="text-lg">{influencer.address}</span>
          <span>|</span>
          <span className="text-lg">{influencer.category}</span>
        </div>
      </div>
      <div className="row mt-2 flex items-center mb-2">
        <div className="info px-4 text-center">
          <h3 className="font-semibold">Followers</h3>
          <span>{influencer.followers}</span>
        </div>
      </div>
      <>
        <div>
          {influencer.status === "pending" && (
            <button
              className="bg-yellow hover:bg-dark-yellow text-white px-4 py-2 rounded-md mr-2 object-cover mx-auto mb-2"
              onClick={() => onApprove(influencer._id)}
            >
              Approve
            </button>
          )}
          {influencer.status === "disabled" && (
            <button
              className="bg-yellow hover:bg-dark-yellow text-white px-4 py-2 rounded-md mr-2"
              onClick={() => onApprove(influencer._id)}
            >
              Approve
            </button>
          )}
          {influencer.status === "approved" && (
            <button
              className="bg-grey hover:bg-dark-grey text-white px-4 py-2 rounded-md"
              onClick={() => onDisable(influencer._id)}
            >
              Disable
            </button>
          )}
        </div>
      </>
    </div>
  );
};

export default AdminAccountControl;
