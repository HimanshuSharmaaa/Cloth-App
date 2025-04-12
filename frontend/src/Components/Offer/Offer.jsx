import React from "react";
import './Offer.css'
import exclusive_image from "../Assets/exclusive_image.png";

const Offer = ({notify}) => {
  return (
    <div className="offer-section">
      <div className="offer-container">
        <div className="offer-left-container">
          <h1>Exclusive Offers For You</h1>
          <p>ONLY ON BEST SELLER PRODUCTS</p>
          <button onClick={()=>notify('Stay tuned for exciting new deals coming soon!')}>Check now</button>
        </div>
        <div className="offer-right-container">
          <img src={exclusive_image} alt="OfferImg" />
        </div>
      </div>
    </div>
  );
};

export default Offer;