import './Banner.css'
import React from 'react';
import hero_image from '../Assets/hero_image.png'
import hand_icon from '../Assets/hand_icon.png'

const Banner = () => {
  return (
    <div className='banner-body'>
        <div className="left-banner">
            <p className='banner-text-new-arrives'>NEW ARRIVES ONLY</p>
            <p className='banner-text-heading'>New <img src={hand_icon} className='banner-hand-icon' alt="hand-icon" /> Collections For Everyone</p>
            <button className='banner-button'>Check now &nbsp;&nbsp;<i className="fa-solid fa-arrow-right-long"></i></button>
        </div>
        <div className="right-banner">
          <img src={hero_image} alt="hero-image" />
        </div>
    </div>
  )
}

export default Banner;