import "./Category.css";
import { ShopContext } from "../../Context/ShopContext";
import React, { useContext, useEffect, useRef } from "react";
import dropdown_icon from "../../Components/Assets/dropdown_icon.png";
import IndividualProduct from "../../Components/IndividualProduct/IndividualProduct";

const Category = ({ banner, category, notify }) => {
  const { allProduct, setProgress } = useContext(ShopContext);
  const prevCategory = useRef(category); // Store previous category value

  useEffect(() => {
    setProgress(30); // Start progress bar

    const step1 = setTimeout(() => {
      setProgress(70); // Midway visual
    }, 200);

    const step2 = setTimeout(() => {
      setProgress(100); // Complete progress
    }, 600);

    const reset = setTimeout(() => {
      setProgress(0); // Reset for future use
    }, 1200);

    // Notify user when category changes
    if (prevCategory.current !== category) {
      notify(`Welcome in ${category} category.`);
      prevCategory.current = category; // Update prevCategory reference
    }

    // Cleanup the timeouts
    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(reset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]); // Effect depends only on `category` and `notifyUser`

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
              <IndividualProduct
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