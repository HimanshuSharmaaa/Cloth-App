import AdminNavbar from "./Component/AdminNavbar/AdminNavbar";
import LeftSidebar from "./Component/LeftSidebar/LeftSidebar";
import AddProduct from "./Component/AddProduct/AddProduct";
import ProductList from "./Component/ProductList/ProductList";
import Login from "./Component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <AdminNavbar />
      <div className="bars" style={{ display: "flex" }}>
      <LeftSidebar/>
        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;