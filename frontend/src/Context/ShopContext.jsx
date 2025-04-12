import { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  // let cart = {};
  // for (let i = 1; i < allProduct.length; i++) {
  //   cart[i] = 0;
  // }
  // return cart;
  return 0;
};

const ShopContextProvider = ({ children }) => {
  let url = 'http://localhost:4000';
  let [allProduct, setAllProduct] = useState([]);
  let [offerList,setOfferList] = useState([]);
  let [cartItems,setCartItems] = useState(getDefaultCart());

  // eslint-disable-next-line
  useEffect(()=>{
    const fetchOfferList = async() => {
      const res = await fetch(`${url}/offer/`,{
        method:'GET',
        headers:{
          'Content-type':"application/json"
        },
      });
      const resJson = await res.json();
      if (!resJson || !Array.isArray(resJson.result)) {
        console.error("Error: Invalid response format in fetchOfferList");
        setOfferList([]); // default to empty
      } else {
        setOfferList(resJson.result);
      }
    }

    const fetchAllProducts = async() => {
      const res = await fetch(`${url}/api/product/fetchAllProduct`,{
        method:'GET',
        headers:{
          'Content-type':"application/json"
        },
      });
      const resJson = await res.json();
      if (!resJson || !Array.isArray(resJson.result)) {
        console.error("Error: Invalid response format in fetchOfferList");
        setAllProduct([]); // default to empty
      } else {
        setAllProduct(resJson.result);
      }
    }
    fetchAllProducts();
    fetchOfferList();
  },[url]);
  
  const addItems = (itemId) => {
    try {
      setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  const removeItems = (itemId) => {
    try {
      setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const getTotalCartItems = () => {
    let cartTotalQuantity = 0;
    for (let item in cartItems) {
      if(cartItems[item] > 0){
        cartTotalQuantity += cartItems[item];
      }
    }
    return cartTotalQuantity;
  }

  const getTotalAmountCart = () => {
    let cartTotalAmount = 0;
    for (let item in cartItems) {
      if(cartItems[item] > 0){
        let itemInfo = allProduct.find((product) => Number(product.id) === Number(item));
        cartTotalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return cartTotalAmount;
  }
  
  const contextValue = { allProduct, offerList, cartItems, addItems, removeItems, getTotalCartItems, getTotalAmountCart,};

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;