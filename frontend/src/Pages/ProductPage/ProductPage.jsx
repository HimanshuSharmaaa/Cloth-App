import "./ProductPage.css";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Breadcrums from "../../Components/Breadcrums/Breadcrums";
import Description from "../../Components/Description/Description";
import NewCollections from '../../Components/NewCollections/NewCollections'
import IndividualProductPage from "../../Components/IndividualProductPage/IndividualProductPage";

const ProductPage = ({ notify }) => {
  let { allProduct } = useContext(ShopContext);
  let { productId } = useParams();
  let product = allProduct.find((indPro) => Number(indPro.id) === Number(productId));

  if(!product) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="product-page">
      <Breadcrums product={product} />
      <IndividualProductPage notify={notify} product={product} />
      <Description />
      <NewCollections heading='RELATED PRODUCTS' launch='New'/>
    </div>
  );
};

export default ProductPage;