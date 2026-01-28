import React from 'react';
import { Link } from 'react-router-dom';

function Button({ text, link = "#" }) {
  return (
    <Link 
      to={link} 
      className="cta-button inline-block"
    >
      {text}
    </Link>
  );
}

export default Button;
