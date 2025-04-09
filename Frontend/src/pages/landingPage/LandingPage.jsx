import React from "react";
import images from "../../assets/images.jsx";
import Header from "../../utils/Header.jsx";
import Footer from "../../utils/Footer.jsx";
import Button from "../../components/Button.jsx";


const Landingpage = () => {
  return (
    <div className="container min-h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end text-white relative overflow-hidden items-center px-0 bg-cover bg-no-repeat w-screen bg-center h-screen">
      {/* Background 3D Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl animate-bounce"></div>

      {/* Header */}
      <Header />

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col justify-center items-center text-center w-full max-w-3xl px-4 relative">
        {/* Title & Logo */}
        <div className="relative w-full flex justify-center items-center">
          <img
            src={images.Itquiz}
            alt="Quiz Logo"
            className="w-96 max-w-2xl h-auto opacity-70"
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 text-center w-full">
            <h1 className="mt-20 text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-yellow-400 to-white bg-clip-text text-transparent">
              Prashan Baan
            </h1>
            <p className="text-xl italic mt-20">
              Sharpen your mind, hit the target!
            </p>
          </div>
        </div>

        {/* Quiz Competition Details */}
        <p className="">
          <span className="text-3xl md:text-5xl font-extrabold block">
            Quiz Competition
          </span>
          <span className="text-lg block mt-2">Organised By:</span>
          <span className="text-xl md:text-2xl font-semibold block">
            Uttaranchal School Of Computing Sciences
          </span>
        </p>

        {/* Button */}
        <div className="mt-6 border border-white p-2 rounded-full bg-primary hover:bg-secondary">
          <Button text="Get Started →" link="/login" />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landingpage;
