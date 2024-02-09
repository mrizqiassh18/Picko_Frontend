import React from "react";

const HelpCard = ({ data }) => {
  const { step, img, caption } = data;
  return (
    <div className="step flex flex-col items-center justify-center gap-2">
      <div className="step_image">
        <img className="w-52" src={img} alt="free-icon" />
      </div>
      <h2 className="font-bold">{step}</h2>
      <div className="step_caption w-40">
        <p className="text-center">{caption}</p>
      </div>
    </div>
  );
};

export default HelpCard;
