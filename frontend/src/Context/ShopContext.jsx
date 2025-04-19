import { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  let url = "http://localhost:4000";
  const token = localStorage.getItem("token");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  let [userInfo, setUserInfo] = useState("");
  let [allProduct, setAllProduct] = useState([]);
  let [offerList, setOfferList] = useState([]);
  let [cartItems, setCartItems] = useState([]);
  let [cartQuantityTotal, setCartQuantityTotal] = useState(0);
  let [cartQuantityAmountTotal, setCartQuantityAmountTotal] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setProgress(20);
        setLoading(true);
        // Always fetch product list for everyone
        await fetchAllProducts();
        // Only fetch offers & cart if user is logged in
        if (token) await Promise.all([fetchAllCartItems(), fetchOfferList()]);
        setProgress(100);
        setTimeout(() => setProgress(0), 1000);
      } catch (err) {
        console.error("Initial data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [token]);

  // Auto-calculate totals when cart or product list changes
  useEffect(() => {
    getTotalCartItems();
    getTotalAmountCart();
  }, [cartItems, allProduct]);

  const fetchOfferList = async () => {
    const res = await fetch(`${url}/offer`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const resJson = await res.json();
    if (!resJson || !Array.isArray(resJson.result)) {
      console.error("Error: Invalid response format in fetchOfferList");
      setOfferList([]); // default to empty
    } else setOfferList(resJson.result);
  };

  const fetchAllProducts = async () => {
    const res = await fetch(`${url}/api/product/fetchAllProduct`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const resJson = await res.json();
    if (!resJson || !Array.isArray(resJson.result)) {
      console.error("Error: Invalid response format in fetchAllProducts");
      setAllProduct([]);
    } else {
      setAllProduct(resJson.result);
      return resJson.result;
    }
  };

  const fetchAllCartItems = async () => {
    const res = await fetch(`${url}/cart/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const resJson = await res.json();
    if (!resJson || !Array.isArray(resJson.result.rows)) {
      console.error("Error: Invalid response format in fetchAllCartItems");
      setCartItems([]);
    } else setCartItems(resJson.result.rows);
  };

  const addItems = async (product_id) => {
    try {
      const res = await fetch(`${url}/cart/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ product_id }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        setCartItems((prev) => [...prev, resJson.result]);
        return true;
      }
    } catch (error) {
      console.log("Add to cart failed:", error);
    }
    return false;
  };

  const removeItems = async (product_id) => {
    try {
      const res = await fetch(`${url}/cart/delete/${product_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const resJson = await res.json();
      if (resJson.success) {
        setCartItems((prev) => prev.filter((item) => item.id !== resJson.result.id));
        return true;
      }
    } catch (error) {
      console.log("Remove from cart failed:", error);
    }
    return false;
  };

  const getTotalCartItems = () => {
    let cartQuantityTotal = 0;
    cartItems.map((item) => (cartQuantityTotal += Number(item.quantity)));
    setCartQuantityTotal(cartQuantityTotal);
  };

  const getTotalAmountCart = () => {
    let totalAmount = 0;
    cartItems.forEach(({ product_id, quantity }) => {
      const product = allProduct.find((prod) => prod.id === product_id);
      if (product) {
        const price = parseFloat(product.new_price);
        totalAmount += price * quantity;
      } else console.warn(`Product with ID ${product_id} not found`);
    });
    setCartQuantityAmountTotal(totalAmount);
  };

  const contextValue = {
    addItems,
    offerList,
    cartItems,
    allProduct,
    removeItems,
    getTotalCartItems,
    getTotalAmountCart,
    fetchAllProducts,
    fetchOfferList,
    fetchAllCartItems,
    userInfo,
    setUserInfo,
    cartQuantityTotal,
    setCartQuantityTotal,
    cartQuantityAmountTotal,
    loading,
    setLoading,
    progress,
    setProgress,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;