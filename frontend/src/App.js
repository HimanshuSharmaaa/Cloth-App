import "./App.css";
import Home from "./Pages/Home/Home";
import Cart from './Pages/Cart/Cart.jsx';
import { useContext } from "react";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Category from './Pages/Category/Category.jsx';
import { ToastContainer, toast } from "react-toastify";
import { ShopContext } from "./Context/ShopContext.jsx";
import men_banner from './Components/Assets/banner_mens.png';
import kids_banner from './Components/Assets/banner_kids.png';
import ProductPage from "./Pages/ProductPage/ProductPage.jsx";
import women_banner from './Components/Assets/banner_women.png';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProgressBar from './Components/ProgreesBar/ProgressBar.jsx';

const App = () => {
  const { progress } = useContext(ShopContext);
  const notify = (arg) => toast(arg);

  return (
    <div>
    <BrowserRouter>
        <ProgressBar progress={progress}/>
        <Navbar notify={notify}/>
        <Routes>
          <Route path="/" element={<Home notify={notify}/>}/>
          <Route path="/men" element={<Category banner={men_banner} category="Men" notify={notify}/> }/>
          <Route path="/women" element={<Category banner={women_banner} category="Women" notify={notify}/> }/>
          <Route path="/kids" element={<Category banner={kids_banner} category="Kid" notify={notify}/> }/>
          <Route path="/product" element={<ProductPage notify={notify}/> }>
            <Route path=":productId" element={<ProductPage notify={notify}/>}/>
          </Route>
          <Route path="/login" element={<SignUp notify={notify}/> }/>
          <Route path="/cart" element={<Cart notify={notify}/> }/>
          <Route path="*" element={'Page Not Found'}/>
        </Routes>
        <Footer notify={notify}/>
    </BrowserRouter>
    <ToastContainer />
    </div>
  );
}

export default App;