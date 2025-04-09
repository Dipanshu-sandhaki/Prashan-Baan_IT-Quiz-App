import React from "react";
import images from "../../assets/images.jsx";
import Header from "../../utils/Header.jsx";
import Footer from "../../utils/Footer.jsx";
import Button from "../../components/Button.jsx";


const Landingpages = () => {
  const bgImage = {
    width: "100%",
    height:"18rem",
    backgroundImage: `url(${images.Itquiz})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end text-white relative overflow-hidden items-center px-0 bg-cover bg-no-repeat w-screen bg-center h-screen">
      {/* Background 3D Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl animate-bounce"></div>

      {/* Header */}
      <Header />

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col justify-center items-center text-center gap-8 w-full max-w-5xl px-4 relative">
        <div>
          <p className="flex flex-col justify-center items-center text-center w-full max-w-5xl px-4 mt-10 relative">
            <span className="text-3xl md:text-4xl font-bold block">
              Uttaranchal School Of Computing Sciences
            </span>
            <span className="text-lg block mt-2 font-semibold">
              Organising:
            </span>
          </p>
          {/* Title & Logo */}
          <div className="relative w-full flex flex-col justify-center items-center">
            <div className=" text-center w-full" style={bgImage}>
              <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-br mt-[6rem]  from-yellow-400 to-white bg-clip-text text-transparent">
                Prashan Baan
              </h1>
            </div>
            <p className="text-xl italic">
              Sharpen your mind, hit the target!
            </p>
          </div>
        </div>

        {/* Button */}
        <div className=" border border-white p-2 w-[10rem] rounded-full bg-primary hover:bg-secondary">
          <Button text="Get Started →" link="/login" />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landingpages;
