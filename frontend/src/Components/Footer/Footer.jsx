import './Footer.css';
import React from 'react';
import logo from '../Assets/logo.png';

const Footer = ({notify}) => {
  const handleClick = () => {
    window.scrollTo({top:0,behavior:"smooth"});
    notify('Back To Top');
  }

  return (
    <div className='footer-container' style={{marginTop:'50px'}}>
      <div className="footer-head-container" onClick={handleClick}>
        <img className='footer-container-image' src={logo} alt="" />
        <h1 className='footer-container-heading'>SHOPPER</h1>
      </div>
      <ul className='footer-container-lists'>
        <li>Comapny</li>
        <li>About</li>
        <li>Contact</li>
        <li>Product</li>
        <li>Office</li>
      </ul>
      <ul className='footer-container-companies'>
        <li><i className="fa-brands fa-instagram"></i></li>
        <li><i className="fa-brands fa-twitter"></i></li>
        <li><i className="fa-brands fa-whatsapp"></i></li>
      </ul>
      <hr />
      <p className='footer-container-copyright'>Copyright @ 2025 - All Rights Reserved</p>
    </div>
  )
};

export default Footer;