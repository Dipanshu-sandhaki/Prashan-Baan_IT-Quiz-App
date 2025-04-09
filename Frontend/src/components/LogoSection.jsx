import React from "react";
import UUlogo from "../assets/uulogo1.png";
import images from "../assets/images.jsx";

const LogoSection = () => {
  return (
    <div className="flex flex-row items-center gap-3 ml-2">
      <img src={UUlogo} alt="UU Logo" className="w-48 h-12" />
      <h1 className="text-lg font-semibold">X</h1>
      <img src={images.ITUtsav} alt="ITUtsav" className="w-14 h-12" />
    </div>
  );
};

export default LogoSection;
