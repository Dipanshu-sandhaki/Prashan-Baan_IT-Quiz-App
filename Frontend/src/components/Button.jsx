import React from 'react';
import { Link } from 'react-router';


function Button({text, link='#'}) {
  return (
      <button className="cta-button">
    <Link to={link}>{text}</Link>
  </button>
  )
}

export default Button

// import React from 'react';

// const Button = ({ text }) => (
//   <button className="cta-button">
//     {text}
//   </button>
// );

// export default Button;