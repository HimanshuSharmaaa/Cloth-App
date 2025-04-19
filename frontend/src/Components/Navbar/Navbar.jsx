import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { UserContext } from "../../Context/UserContext";
import cart_icon from '../Assets/cart_icon.png';
import logo from '../Assets/logo.png';
import "./Navbar.css";

const Navbar = ({notify}) => {
  let naviagte = useNavigate();
  let location = useLocation();
  let { setIsAuthenticated } = useContext(UserContext);
  let { cartQuantityTotal, getTotalCartItems, cartItems, getTotalAmountCart } = useContext(ShopContext);

  useEffect(() => {
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      await getTotalCartItems();
      await getTotalAmountCart();
    };
    fetchData();
  }, [cartItems]);

  const handleClick = () => {
    if(!cartQuantityTotal) notify("Add items to visit the cart.");
    else naviagte('/cart');
  }
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated('Sign Up');
    naviagte('/');
    notify('Successfully LogOut');
  }

  return (
    <div className="navbar">
      <div className="navbar-container container flex">
        <Link to="/" className="link-tag" onClick={()=>{window.scrollTo({top:0,behavior:"smooth"})}}>
          <div className="navbar-image flex">
            <img src={logo} alt="navbar-image"/>
            <h1>SHOPPER</h1>
          </div>
        </Link>
        <div className="nav-links">
          <ul className="flex nav-ul">
            <Link to="/" className="link-tag"><li className={`${location.pathname==="/"?"line":""}`}>Shop</li></Link>
            <Link to="/men" className="link-tag"><li className={`${location.pathname==="/men"?"line":""}`}>Men</li></Link>
            <Link to="/women" className="link-tag"><li className={`${location.pathname==="/women"?"line":""}`}>Women</li></Link>
            <Link to="/kids" className="link-tag"><li className={`${location.pathname==="/kids"?"line":""}`}>Kids</li></Link>
          </ul>
        </div>
        <div className="nav-button flex">
          {localStorage.getItem('token')?<button className="primary-button" onClick={handleLogout}>LogOut</button>:<Link to="/login" className="link-tag"><button className="primary-button">Login</button></Link>}
          <div onClick={handleClick} className="link-tag"><img src={cart_icon} alt="cart_icon" className="nav-button-image"/></div>
          <div onClick={handleClick} className="cart-counter">{cartQuantityTotal>9?'9+':cartQuantityTotal}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;