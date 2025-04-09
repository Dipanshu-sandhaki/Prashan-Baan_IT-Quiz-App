import React from "react";

function Footer({className}) {
  return (
    <footer className={className + " text-white text-center py-4 w-full shadow-lg border-t-2 border-gray-800"}>
      <p className="text-sm font-light">
        © {new Date().getFullYear()} Uttaranchal School of Computing Sciences - All Rights Reserved 
      </p>
    </footer>
  );
}

export default Footer;


