import React from "react";
import { Link } from "react-router-dom"; // Imported Link for navigation
import Header from "./utils/Header.jsx";
import Footer from "./utils/Footer.jsx";
import images from "./assets/images";

const Card = ({ name, position, course, image, linkedin }) => (
  <div className="w-[22rem] bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-transparent">
    <a href={linkedin || "#"} target="_blank" rel="noopener noreferrer">
      {image ? (
        // Added 'object-top' to align images to the top, preventing face-cropping
        <img className="rounded-t-lg w-full h-64 object-cover object-top" src={image} alt={name} />
      ) : (
        <div className="rounded-t-lg w-full h-64 flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-4xl font-bold text-gray-800 dark:text-white">
          {name.split(" ").map(n => n[0]).join("")}
        </div>
      )}
    </a>
    <div className="p-5">
      <a href={linkedin || "#"} target="_blank" rel="noopener noreferrer">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      </a>
      <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">{position}</p>
      {course && <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{course}</p>}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View LinkedIn
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      )}
    </div>
  </div>
);

const teamMembers = [
  {
    name: "Bhupendra Singh Bisht",
    position: "Full Stack Developer",
    course: "MCA-USCS",
    image: images.Bhupendra,
    linkedin: "https://linkedin.com/in/bhupendra-singh-bisht"
  },
  {
    name: "Shubham Kumar",
    position: "Frontend Developer",
    course: "MCA-USCS",
    image: images.Shubham,
    linkedin: "https://linkedin.com/in/shubhkasyap1"
  },
  {
    name: "Dipanshu Sandhaki",
    position: "Frontend Developer",
    course: "MCA-USCS",
    image: images.Dipanshu,
    linkedin: "https://linkedin.com/in/dipanshusandhaki"
  },
  {
    name: "Aditya Kumar Singh",
    position: "UI/UX Designer",
    course: "MCA-USCS",
    image: images.Aditya,
    linkedin: "https://linkedin.com/in/aditya-kumarsingh"
  }
];

const eventHeads = [
  {
    name: "Ajay Singh Rawat",
    position: "Tech Head",
    image: images.Ajay
  },
  {
    name: "Dr. Meera Sharma",
    position: "Head-Prashan Baan",
    image: images.Meera
  },
  {
    name: "Shivani Sisodia",
    position: "Event Head",
    image: images.Shivani
  }
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end text-white overflow-hidden items-center w-screen bg-cover bg-no-repeat bg-center relative">
      <Header />

      {/* ⭐ Back to Home Button (Top Right) ⭐ */}
      <Link
        to="/"
        className="absolute top-24 right-4 md:top-28 md:right-8 z-50 flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all shadow-lg"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Home
      </Link>

      <main className="flex-1 flex flex-col justify-center items-center text-center gap-12 w-full max-w-6xl px-4">
        <h2 className="text-4xl font-bold mt-16 mb-4">Event Heads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {eventHeads.map((head, index) => (
            <Card key={index} {...head} />
          ))}
        </div>

        <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 mb-10">
          {teamMembers.map((member, index) => (
            <Card key={index} {...member} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;