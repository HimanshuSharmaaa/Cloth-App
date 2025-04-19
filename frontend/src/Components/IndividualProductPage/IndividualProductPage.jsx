import './IndividualProductPage.css';
import Loader from '../Loader/Loader';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { useContext, useCallback } from 'react';
import star_icons from '../Assets/star_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import star_dull_icon from '../Assets/star_dull_icon.png';

const IndividualProductPage = (props) => {
  const navigate = useNavigate();
  const { addItems, fetchAllCartItems, setProgress , setLoading } = useContext(ShopContext);
  const { product } = props;

  // Debounced cart handler
  const debouncedHandleCart = useCallback(
    debounce(async () => {
      setLoading(true);
      if (localStorage.getItem('token')) {
        setProgress(10);
        if (await addItems(product.id)) {
          await fetchAllCartItems();
          props.notify('Product Added in Cart');
        } else {
          props.notify('Something Wrong...');
        }
        setProgress(100);
        setTimeout(() => setProgress(0), 500);
      } else {
        props.notify('Login/Signup first to addItems');
        navigate('/login');
      }
    }, 500),
    [product.id, addItems, fetchAllCartItems, props.notify, setProgress, navigate]
  );

  if (!product) return <Loader/>;

  const capitalize = (word) => word ? word.charAt(0).toUpperCase() + word.slice(1) : '';

  return (
    <div className="IndividualProductPage-container">
      {/* left content */}
      <div className="left-IndividualProductPage-container">
        <div className="left-left-IndividualProductPage-subImg-container">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={product.image} alt="" className="left-subImg" />
          ))}
        </div>
        <div className="left-right-IndividualProductPage-heroImg-container">
          <img src={product.image} alt="" />
        </div>
      </div>

      {/* right content */}
      <div className="right-IndividualProductPage-container">
        <h1 className="right-IndividualProductPage-heading-container">
          {product.name}
        </h1>
        <div className="right-IndividualProductPage-container-image">
          {[...Array(4)].map((_, i) => (
            <img key={i} className="IndividualProductPage-rating-image" src={star_icons} alt="" />
          ))}
          <img className="IndividualProductPage-rating-image" src={star_dull_icon} alt="" /> (112)
        </div>
        <div className="right-IndividualProductPage-price-container">
          <h3 className="right-IndividualProductPage-container-old-price">${product.old_price}</h3>
          <h3 className="right-IndividualProductPage-container-new-price">${product.new_price}</h3>
        </div>
        <p className="right-IndividualProductPage-container-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
        </p>
        <h3 className="right-IndividualProductPage-sizes-container-heading">Select Size</h3>
        <div className="right-IndividualProductPage-container-sizes">
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <div key={size} className="right-IndividualProductPage-container-box">{size}</div>
          ))}
        </div>

        <button className="right-IndividualProductPage-container-button" onClick={debouncedHandleCart}>ADD TO CART</button>

        <div className="right-IndividualProductPage-bottom-container">
          <div className="right-IndividualProductPage-category-container">
            <h3 className="right-IndividualProductPage-category">Category : </h3>
            <p className="right-IndividualProductPage-category-sizes">
              {capitalize(product.category) || 'Uncategorized'}, T-shirts, Crop Shirt.
            </p>
          </div>
          <div className="right-IndividualProductPage-tag-container">
            <h3 className="right-IndividualProductPage-container-sizes">Tags : </h3>
            <p className="right-IndividualProductPage-container-sizes">Modern, Latest.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProductPage;