import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import cart_cross_icon from "../../Components/Assets/cart_cross_icon.png";

const Cart = ({ notify }) => {
  const [promoCode,setPromoCode] = useState('');
  const navigate = useNavigate();
  const { all_product, cartItems, removeItems, getTotalAmountCart, offerList } = useContext(ShopContext);

  useEffect(() => {
    if (getTotalAmountCart() === 0) {
      notify("Cart Become Empty");
      navigate("/");
    }
  }, [getTotalAmountCart, notify, navigate]);

  const handleRemove = async (id) => {
    try {
      if (await removeItems(id)) notify("Removed Item From Cart.");
      else notify("Something went wrong");
    } catch (error) {
      console.log(error);
      notify("Error occur in handleRemove.");
    }
  };

  const handelSubmit = () => {
    console.log(promoCode);
  }

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <div key={item.id}>
              <div className="cartItems-format-main">
                <img className="cartItem-product-icon" src={item.image} alt=""/>
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button className="cartItems-quantity"> {cartItems[item.id]}</button>
                <p>${item.new_price * cartItems[item.id]}</p>
                <img src={cart_cross_icon} className="cartItem-product-remove-icon" onClick={() => handleRemove(item.id)} alt="cart_cross_icon"/>
              </div>
              <hr />
            </div>
          );
        } else {
          return null;
        }
      })}
      <div className="cart-total-container">
        <div className="left-cart-total-container">
          <h1 className="left-cart-heading">Cart Totals</h1>
          <div className="left-cart-container">
            <div className="left-cart-item">
              <p>SubTotal</p>
              <p>${getTotalAmountCart()}</p>
            </div>
            <hr />
            <div className="left-cart-item">
              <p>Discount Applied</p>
              <p>0</p>
            </div>
            <hr />
            <div className="left-cart-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="left-cart-item">
              <p><b>Totals</b></p>
              <p><b>${getTotalAmountCart()}</b></p>
            </div>
            <hr />
            <Link to='/payment'><button className="left-cart-proceed-button"><b>PROCEED TO CHECKOUT</b></button></Link>
          </div>
        </div>
        <div className="right-cart-total-container">
          <div className="input-promoCode-container">
            <p className="right-cart-heading">If you have a promo-code, Enter here</p>
            <input type="text" value={promoCode} onChange={(e)=>setPromoCode(e.target.value)} className="right-cart-input" placeholder="promo code"/>
            <button className="right-cart-submit-button" onClick={handelSubmit}>Submit</button>
          </div>
          {getTotalAmountCart()!==0 && <div className="promoCode-container">
            <h1 className="promoCode-heading">Coupons Bucket</h1>
            <div className="coupons-container">
              {offerList && offerList.length>0 ? (
                offerList.map((offer, index) => (
                  <h4 key={index} onClick={()=>setPromoCode(offer.code)} className={offer.active ? 'active' : 'notActive'}>
                  {`SAVE ${offer.code} ${offer.disAmount} OFF ORDER ABOVE ${offer.minCartVal}`.toUpperCase()}</h4>
                ))
              ):(
                <h3>No offers available</h3>
              )}
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
};

export default Cart;