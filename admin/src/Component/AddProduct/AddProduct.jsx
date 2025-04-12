import "./AddProduct.css";
import React, { useContext, useState } from "react";
import upload_area from "../Assets/upload_area.png";
import { ProductContext } from "../../Context/ProductContext";

const AddProduct = () => {
  const { addProductApi } = useContext(ProductContext);
  const [productDetail, setProductDetail] = useState({name: "",new_price: "",old_price: "",category: "Men",quantity: "",image: "", launch: 'Regular',brand: "ZARA"});
  const [uploadImage, setUploadImage] = useState(false);

  const handleChange = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    addProductApi(productDetail, uploadImage);
    setProductDetail({name: "",new_price: "",old_price: "",category: "Men",quantity: "",image: "", launch: "Regular", brand: "ZARA"});
    setUploadImage(false);
  };

  return (
    <div className="addproduct-container">
      <div className="addproduct">
        <div className="product-title-container">
          <label className="label" htmlFor="name">Product Title</label>
          <input className="admin-input" type="text" value={productDetail.name} onChange={handleChange} name="name" id="name" placeholder="Type Here"/>
        </div>
        <div className="product-price-container flex-justify">
          <div className="new_price-container flex-column">
            <label className="label" htmlFor="new_price">Product Offer Price</label>
            <input className="admin-input" value={productDetail.new_price} type="number" onChange={handleChange} name="new_price" id="new_price" placeholder="Type Here"/>
          </div>
          <div className="old_price-container flex-column">
            <label className="label" htmlFor="old_price">Product Base Price</label>
            <input className="admin-input" type="number" value={productDetail.old_price} onChange={handleChange} name="old_price" id="old_price" placeholder="Type Here"/>
          </div>
        </div>
        <div className="product-category-avaliablity-container flex-justify">
          <div className="product-category flex-column">
            <label className="label" htmlFor="category">Product Category</label>
            <select className="admin-input" name="category" value={productDetail.category} onChange={handleChange} id="category">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kid">Kid</option>
            </select>
          </div>
          <div className="product-avaliablity flex-column">
            <label className="label" htmlFor="quantity">Product Quantity</label>
            <input className="admin-input" type="number" value={productDetail.quantity} onChange={handleChange} name="quantity" id="quantity" placeholder="Enter Here"/>
          </div>
        </div>
        <div className="product-image">
          <div className="upload_container">
          <label htmlFor="image">
            <img src={uploadImage ? URL.createObjectURL(uploadImage) : upload_area}alt="upload_area"className="upload-image"/>
            </label>
            <input id="image" onChange={(e) => setUploadImage(e.target.files[0])} name="image" hidden type="file"/>
          <button disabled={ !productDetail.name || !productDetail.new_price || !productDetail.old_price || !productDetail.quantity || uploadImage === false} className={`product-button ${!productDetail.name ||!productDetail.new_price ||!productDetail.old_price ||!productDetail.quantity ||uploadImage === false?"product-button":"product-button-backgroundColor"}`} onClick={addProduct}>ADD</button>
          </div>
          <div className="launch-container flex-column">
          <label className="label launch-label" htmlFor="launch">Newly Launched</label>
            <select className="admin-input launch-input" name="launch" value={productDetail.launch} onChange={handleChange} id="launch">
              <option value="New">New</option>
              <option value="Hot">Hot</option>
              <option value="Regular">Regular</option>
              <option value="Popular">Popular</option>
            </select>
          <label className="label brand-label" htmlFor="brand">Product Brand</label>
            <select className="admin-input launch-input" name="brand" value={productDetail.brand} onChange={handleChange} id="brand">
              <option value="Zara">Zara</option>
              <option value="H&M">H&M</option>
              <option value="Gucci">Gucci</option>
              <option value="Louis Vuitton">Louis Vuitton</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;