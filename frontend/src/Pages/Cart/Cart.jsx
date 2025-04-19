import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { ShopContext } from "../../Context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import cart_cross_icon from "../../Components/Assets/cart_cross_icon.png";

const Cart = ({ notify }) => {
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();
  const {
    allProduct,
    removeItems,
    getTotalAmountCart,
    getTotalCartItems,
    offerList,
    cartItems,
    cartQuantityAmountTotal,
    setProgress,
    loading,
  } = useContext(ShopContext);

  // Only compute totals when cartItems change
  useEffect(() => {
    getTotalAmountCart();
    getTotalCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  // Redirect if cart becomes empty
  useEffect(() => {
    if (!loading && cartItems.length > 0 && cartQuantityAmountTotal === 0) {
      notify("Cart Became Empty");
      navigate("/");
    }
  }, [loading, cartItems, cartQuantityAmountTotal, notify, navigate]);

  const handleRemove = async (id) => {
    try {
      setProgress(30);
      const result = await removeItems(id);
      setProgress(70);
      notify(result ? "Removed Item From Cart." : "Something went wrong");
    } catch (error) {
      console.error("handleRemove error:", error);
      notify("Error occurred in handleRemove.");
    } finally {
      setProgress(100);
    }
  };

  const handleSubmit = () => {
    console.log("Promo code submitted:", promoCode);
    // Add promo code logic here
  };

  if (loading) return <Loader />;

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

      {allProduct.map((product) => {
        const cartEntry = cartItems.find(
          (item) => item.product_id === product.id
        );
        if (cartEntry?.quantity > 0) {
          return (
            <div key={product.id}>
              <div className="cartItems-format-main">
                <img
                  className="cartItem-product-icon"
                  src={product.image}
                  alt={product.name}
                />
                <p>{product.name}</p>
                <p>${product.new_price}</p>
                <button className="cartItems-quantity">
                  {cartEntry.quantity}
                </button>
                <p>${(product.new_price * cartEntry.quantity).toFixed(2)}</p>
                <img
                  alt="Remove item"
                  src={cart_cross_icon}
                  className="cartItem-product-remove-icon"
                  onClick={() => handleRemove(cartEntry.id)}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cart-total-container">
        <div className="left-cart-total-container">
          <h1 className="left-cart-heading">Cart Totals</h1>
          <div className="left-cart-container">
            <div className="left-cart-item">
              <p>SubTotal</p>
              <p>${cartQuantityAmountTotal.toFixed(2)}</p>
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
              <p>
                <b>Totals</b>
              </p>
              <p>
                <b>${cartQuantityAmountTotal.toFixed(2)}</b>
              </p>
            </div>
            <hr />
            <Link to="/payment">
              <button className="left-cart-proceed-button">
                <b>PROCEED TO CHECKOUT</b>
              </button>
            </Link>
          </div>
        </div>

        <div className="right-cart-total-container">
          <div className="input-promoCode-container">
            <p className="right-cart-heading">
              If you have a promo-code, Enter here
            </p>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="right-cart-input"
              placeholder="Promo code"
            />
            <button className="right-cart-submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>

          {cartQuantityAmountTotal > 0 && (
            <div className="promoCode-container">
              <h1 className="promoCode-heading">Coupons Bucket</h1>
              <div className="coupons-container">
                {offerList.length > 0 ? (
                  offerList.map((offer, idx) => (
                    <h4
                      key={idx}
                      onClick={() => setPromoCode(offer.code)}
                      className={offer.active ? "active" : "notActive"}
                    >
                      {`SAVE ${offer.code} ${offer.disAmount} OFF ORDER ABOVE ${offer.minCartVal}`.toUpperCase()}
                    </h4>
                  ))
                ) : (
                  <h3>No offers available</h3>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;