import React from 'react';

const InfluencerCard = ({ influencer }) => {
  const { name, address, category, followers, profile_photo, phone, socialMediaLink } = influencer;

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}`;

  return (
    <div className="profile-card border-white40 flex w-full max-w-md flex-col items-center rounded-lg border bg-white p-8 shadow-lg mb-10">
      <div className="image relative h-70 w-100 flex items-center">
        <img
          className="object-cover rounded-lg h-44 w-60"
          src={profile_photo}
          alt={`influencer-${name}-photo`}
        />
      </div>
      <div className="data mt-4 text-center">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <div className="flex gap-2 justify-center">
          <span className="text-lg">{address}</span>
          <span>|</span>
          <span className="text-lg">{category}</span>
        </div>
      </div>
      <div className="row mt-2 flex items-center mb-2">
        <div className="info px-4 text-center">
          <h3 className="font-semibold">Followers</h3>
          <span>{followers}</span>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow text-white px-4 py-2 rounded-md object-cover mx-auto mb-2 hover:bg-dark-yellow"
        >
          WhatsApp
        </a>
        <a
          href={socialMediaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-grey text-white px-4 py-2 rounded-md object-cover mx-auto mb-2 hover:bg-dark-grey"
        >
          Social Media
        </a>
      </div>
    </div>
  );
};

export default InfluencerCard;