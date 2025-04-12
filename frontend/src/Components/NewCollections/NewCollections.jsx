import "./NewCollections.css";
import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import IndividualProduct from "../IndividualProduct/IndividualProduct";

const NewCollections = ({heading,launch}) => {
  const { allProduct } = useContext(ShopContext);
  return (
    <div className="newcollection-container">
      <h1>{heading}</h1>
      <hr />
      <div className="newcollection-items">
        {allProduct.filter((item) => item.isNewLaunch === launch).map((item) => {
          return (
            <IndividualProduct
              key={item.id}
              id={item.id}
              img={item.image}
              name={item.name}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;