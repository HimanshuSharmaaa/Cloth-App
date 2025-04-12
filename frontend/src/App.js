import "./App.css";
import { useState } from "react";
import Home from "./Pages/Home/Home";
import Cart from './Pages/Cart/Cart.jsx';
import SignUp from "./Pages/SignUp/SignUp.jsx";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader.jsx";
import Category from './Pages/Category/Category.jsx';
import { ToastContainer, toast } from "react-toastify";
import men_banner from './Components/Assets/banner_mens.png';
import kids_banner from './Components/Assets/banner_kids.png';
import ProductPage from "./Pages/ProductPage/ProductPage.jsx";
import women_banner from './Components/Assets/banner_women.png';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const notify = (arg) => toast(arg);
  const [load, setLoad] = useState(0);
  return (
    <div>
    <BrowserRouter>
        <Navbar notify={notify}/>
        <Loader load={load}/>
        <Routes>
          <Route path="/" element={<Home setLoad={setLoad} notify={notify}/>}/>
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