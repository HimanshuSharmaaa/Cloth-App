import "./LeftSidebar.css";
import { Link } from "react-router-dom";
import AdminCart from "../Assets/AdminCart.png";
import AdminFolder from "../Assets/AdminFolder.png";
import LeftSidebarCard from "../LeftSidebarCard/LeftSidebarCard";

const LeftSidebar = () => {
  return (
    <div className="LeftSidebar">
      <div className="LeftSidebarCards-container">
        <Link className="sidebar-links" to="/">
          <LeftSidebarCard img={AdminCart} title="Add New Products" />
        </Link>
        <Link className="sidebar-links" to="/productlist">
          <LeftSidebarCard img={AdminFolder} title="Products List" />
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;