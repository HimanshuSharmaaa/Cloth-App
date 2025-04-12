import React, { useContext, useEffect, useRef } from "react";
import IndividualProuct from "../../Components/IndividualProduct/IndividualProduct";
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from "../../Components/Assets/dropdown_icon.png";
import "./Category.css";

const Category = ({ banner, category, notify }) => {
  const { allProduct } = useContext(ShopContext);
  const prevCategory = useRef(null); // Store previous category

  useEffect(() => {
    if (prevCategory.current !== category) {
      notify(`Welcome in ${category} category.`);
      prevCategory.current = category; // Update previous category
    }
  }, [category, notify]);

  return (
    <div className="category-container">
      <div className="category-container-image">
        <img src={banner} alt="category-container-image" />
      </div>
      <div className="category-container-sort">
        <p>
          <b>Showing 1-12</b> out of 54 Products.
        </p>
        <p className="category-container-sort-button">
          Sort By &nbsp;
          <img src={dropdown_icon} alt="category-container-sort-image" />
        </p>
      </div>
      <div className="category-container-items">
        {allProduct.map((item) => {
          if (category === item.category) {
            return (
              <IndividualProuct
                key={item.id}
                id={item.id}
                img={item.image}
                name={item.name}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return <React.Fragment key={item.id}></React.Fragment>;
        })}
      </div>
    </div>
  );
};

export default Category;