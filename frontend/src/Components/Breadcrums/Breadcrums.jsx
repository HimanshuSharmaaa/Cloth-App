import React from "react";
import './Breadcrums.css';
import breadcrum_arrow from '../Assets/breadcrum_arrow.png';

const Breadcrums = ({product}) => {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  if (!product) return null;
  return (
    <div className="product-page-container">
      <div className="breadcrum-container">
        Home<img src={breadcrum_arrow} alt="" />
        Shop<img src={breadcrum_arrow} alt="" />
        {capitalize(product.category)}<img src={breadcrum_arrow} alt="" />
        {capitalize(product.name)}
        <img src={breadcrum_arrow} alt="" />
      </div>
    </div>
  );
};

export default Breadcrums;