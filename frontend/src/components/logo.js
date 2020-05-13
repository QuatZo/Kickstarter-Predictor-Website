import React from 'react';
import logo from '../images/pol-kckstr.png'; // Tell webpack this JS file uses this image

function Logo() {
  // Import result is the URL of your image
  return <img className='logo' src={logo} alt="Logo" />;
}
export default Logo;