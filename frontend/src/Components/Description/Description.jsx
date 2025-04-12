import { useState } from "react";
import "./Description.css";

const Description = () => {
  let [para, setPara] = useState(`A well-coordinated outfit consisting of a jacket, matching shirt, and pants creates a polished and stylish look suitable for various occasions. Jackets, available in styles such as blazers, bomber jackets, and denim or leather options, add structure and sophistication while providing warmth and protection.\n
          
      The shirt, carefully chosen to complement the jacket, can range from a crisp button-down for a formal touch to a casual t-shirt or polo for a relaxed vibe. Matching pants complete the ensemble, with options like tailored trousers for a refined appearance, chinos for a smart-casual look, or jeans for a more laid-back style.\n
          
          The overall outfit can be styled in various ways, depending on fabric choices, color coordination, and fit. Neutral tones create a timeless and versatile appeal, while bold colors and patterns add personality and flair. Accessories like belts, shoes, and watches further enhance the outfit, making it adaptable for different settings, from business meetings to social gatherings.`);

  const handleClick = (e) => {
    if (e.target.textContent === "Description") {
      setPara(`A well-coordinated outfit consisting of a jacket, matching shirt, and pants creates a polished and stylish look        suitable for various occasions. Jackets, available in styles such as blazers, bomber jackets, and denim or leather options, add structure and sophistication while providing warmth and protection.
          
      The shirt, carefully chosen to complement the jacket, can range from a crisp button-down for a formal touch to a casual t-shirt or polo for a relaxed vibe. Matching pants complete the ensemble, with options like tailored trousers for a refined appearance, chinos for a smart-casual look, or jeans for a more laid-back style.
          
          The overall outfit can be styled in various ways, depending on fabric choices, color coordination, and fit. Neutral tones create a timeless and versatile appeal, while bold colors and patterns add personality and flair. Accessories like belts, shoes, and watches further enhance the outfit, making it adaptable for different settings, from business meetings to social gatherings.`);
    } else if (e.target.textContent === "Rating") {
      setPara(`Jackets are a key element of fashion, offering both style and functionality. They score highly in style with a solid ★★★★★ rating, as they enhance any outfit, whether formal or casual. Comfort-wise, they earn ★★★★☆, as some materials, like leather or heavy wool, may feel restrictive, while others, like cotton or lightweight synthetics, provide better ease of movement. Durability is a strong point, rated at ★★★★★, since high-quality jackets, especially leather and denim, can last for years. However, their versatility is rated ★★★★☆, as some styles are season-specific and not suitable for year-round wear.

Shirts are among the most versatile clothing items, blending fashion with comfort. In terms of style, they earn a ★★★★☆, as they can be dressed up or down based on the occasion. Comfort is a major strength, receiving a ★★★★★, particularly with fabrics like cotton and linen that allow breathability. Durability depends on the fabric and care, giving shirts a ★★★★☆ rating—higher-quality options last longer, while some may wear out with frequent washing. Versatility is where shirts shine, rated at ★★★★★, as they fit seamlessly into formal, casual, and business settings.`);
    }
  };

  return (
    <div className="description-section">
      <div className="description-container-heading">
        <p className="description-name" onClick={handleClick}>
          Description
        </p>
        <p className="rating-name" onClick={handleClick}>
          Rating
        </p>
      </div>
      <div className="description-container">{para}</div>
    </div>
  );
};

export default Description;