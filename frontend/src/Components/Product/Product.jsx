import './Product.css';
import React, { useContext } from "react";
import IndividualProduct from "../IndividualProduct/IndividualProduct";
import { ShopContext } from "../../Context/ShopContext";

const Product = () => {
  const {allProduct} = useContext(ShopContext);
  return (
    <div className="product-section">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="product-container">
        {allProduct.map((item) => {
          return (
            <IndividualProduct key={item.id} id={item.id} img={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Product;