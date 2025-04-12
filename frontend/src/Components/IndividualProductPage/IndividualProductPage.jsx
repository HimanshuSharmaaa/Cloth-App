import './IndividualProductPage.css';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import star_icons from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const IndividualProductPage = (props) => {
  let navigate = useNavigate();
  let {addItems} = useContext(ShopContext);
  let {product} = props;

  const handleCart = async() => {
    if(localStorage.getItem('token')){
      if(await addItems(product.id)) props.notify('Product Added in Cart');
      else props.notify('Something Wrong...');
    } else {
      props.notify('Login/Signup first to addItems');
      navigate('/login');
    }
  }

  if(!product){
    return <div>Loading..</div>
  }

  const capitalize = (word) => {
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
  };

  return (
    <div className='IndividualProductPage-container'>
        <div className="left-IndividualProductPage-container">
          <div className="left-left-IndividualProductPage-subImg-container">
            <img src={product.image} alt="" className='left-subImg'/>
            <img src={product.image} alt="" className='left-subImg'/>
            <img src={product.image} alt="" className='left-subImg'/>
            <img src={product.image} alt="" className='left-subImg'/>
          </div>
          <div className="left-right-IndividualProductPage-heroImg-container">
            <img src={product.image} alt="" />
          </div>
        </div>
        <div className="right-IndividualProductPage-container">
          <h1 className='right-IndividualProductPage-heading-container'>{product.name}</h1>
          <div className="right-IndividualProductPage-container-image">
            <img className='IndividualProductPage-rating-image' src={star_icons} alt="" />
            <img className='IndividualProductPage-rating-image' src={star_icons} alt="" />
            <img className='IndividualProductPage-rating-image' src={star_icons} alt="" />
            <img className='IndividualProductPage-rating-image' src={star_icons} alt="" />
            <img className='IndividualProductPage-rating-image' src={star_dull_icon} alt="" /> (112)
          </div>
          <div className="right-IndividualProductPage-price-container">
            <h3 className='right-IndividualProductPage-container-old-price'>${product.old_price}</h3>
            <h3 className='right-IndividualProductPage-container-new-price'>${product.new_price}</h3>
          </div>
          <p className='right-IndividualProductPage-container-description'>A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
          <h3 className='right-IndividualProductPage-sizes-container-heading'>Select Size</h3>
          <div className="right-IndividualProductPage-container-sizes">
            <div className="right-IndividualProductPage-container-box">S</div>
            <div className="right-IndividualProductPage-container-box">M</div>
            <div className="right-IndividualProductPage-container-box">L</div>
            <div className="right-IndividualProductPage-container-box">XL</div>
            <div className="right-IndividualProductPage-container-box">XXL</div>
          </div>
          <button className='right-IndividualProductPage-container-button' onClick={handleCart}>ADD TO CART</button>
          <div className="right-IndividualProductPage-bottom-container">
            <div className="right-IndividualProductPage-category-container">
              <h3 className='right-IndividualProductPage-category'>Category : </h3>
              <p className='right-IndividualProductPage-category-sizes'>{capitalize(product.category) || 'Uncategorized'} , T-shirts , Crop Shirt.</p>
            </div>
            <div className="right-IndividualProductPage-tag-container">
              <h3 className='right-IndividualProductPage-container-sizes'>Tags : </h3>
              <p className='right-IndividualProductPage-container-sizes'>Modern , Latest.</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default IndividualProductPage;