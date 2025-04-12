import React from "react";
import "./IndividualProduct.css";
import { Link } from "react-router-dom";

const IndividualProduct = (props) => {
  return (
    <Link to={`/product/${props.id}`} className="IndividualProduct-link" onClick={() => {window.scrollTo({top:0})}}>
      <div className="Individual-Product-section">
        <img src={props.img} alt="IndividualPropsImg" />
        <p>{props.name}</p>
        <div className="price-container">
          <div className="new-price-container">${props.new_price}</div>
          <div className="old-price-container">${props.old_price}</div>
        </div>
      </div>
    </Link>
  );
};

export default IndividualProduct;