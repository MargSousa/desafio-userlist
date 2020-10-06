import React from 'react';
import logo from '../../assets/pipedrive-logo.png';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}
 
export default Header;