import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import Modal from "../Modal/Modal";
import "./ProductList.css";

const ProductList = () => {
  const refOpen = useRef('');
  const { removeProductApi, fetchAllProductApi, updateProductApi, allProduct } = useContext(ProductContext);
  const [updateDetails,setUpdateDetails] = useState({name:"",category:"",new_price:"",old_price:"", quantity:"",available:"",image:null});
  const [isOpen, setIsOpen] = useState(false);
  const [id,setId] = useState(-1);

  useEffect(()=>{
    fetchAllProductApi();
    // eslint-disable-next-line
  },[]);

  const handlechange = (e) => {
    setUpdateDetails({...updateDetails,[e.target.name]:e.target.value});
  }

  const handleImageChange = (e) => {
    setUpdateDetails((prev)=>({...prev,image:e.target.files[0]}));
  }

  const handleUpdate = async(id) => {
    let selectedItem = allProduct.filter((ele) => ele.id === id);
    setUpdateDetails({name:selectedItem[0].name,category:selectedItem[0].category,new_price:selectedItem[0].new_price,old_price:selectedItem[0].old_price,available:selectedItem[0].available,quantity:selectedItem[0].quantity,image:selectedItem[0].image});
    setId(id);
    refOpen.current.click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    console.log(id,updateDetails,updateDetails.image);
    updateProductApi(id, updateDetails, updateDetails.image);
  }
  
  return (
    <>
    <div>
      <button ref={refOpen} onClick={()=>setIsOpen(true)} hidden>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={{textAlign:"center"}}>Update Product Information</h2>
        <form className="update-formdata">
          <div className="form-items">
            <label htmlFor="name">Name</label>
            <input onChange={handlechange} className="forms-input" type="text" id="name" value={updateDetails.name} name="name"/>
          </div>
          <div className="form-items">
            <label htmlFor="category">Category</label>
            <select className="forms-input" name="category" onChange={handlechange} value={updateDetails.category} id="category">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kid">Kid</option>
            </select>
          </div>
          <div className="form-items">
            <label htmlFor="new_price">New Price</label>
            <input onChange={handlechange} className="forms-input" type="Number" value={updateDetails.new_price} name="new_price" id="new_price"/>
          </div>
          <div className="form-items">
            <label htmlFor="old_price">Old Price</label>
            <input onChange={handlechange} className="forms-input" type="Number" value={updateDetails.old_price} name="old_price" id="old_price"/>
          </div>
          <div className="form-items">
            <label htmlFor="quantity">Quantity</label>
            <input onChange={handlechange} className="forms-input" type="Number" value={updateDetails.quantity} name="quantity" id="quantity"/>
          </div>
          <div className="form-items">
          <label htmlFor="available">Available</label>
            <select className="forms-input" name="available" onChange={handlechange} value={updateDetails.available} id="available">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="image">Image : </label>{"      "} 
            <input onChange={handleImageChange} className="forms-input" type="file" id="image" name="image"/>
          </div>
          <button onClick={handleSubmit} type="button" className="form-button" value="Save Changes">Save Changes</button>
        </form>
      </Modal>
    </div>
    <div className="product-container">
      <div className="product-inner-container">
        <h1 className="product-heading">ALL PRODUCTS</h1>
        <div className="products-items">
          <p>Image</p>
          <p className="margin-right">Title</p>
          <p className="Moreleft">Category</p>
          <p className="left">New</p>
          <p className="left">Old</p>
          <p className="left">Quantity</p>
          <p className="left">Update</p>
          <p className="left">Remove</p>
        </div>
        <hr />
        <div className="product-fetch-items">
        {allProduct.length>0?allProduct.map((item,index) => {
          return (
            <div key={index}>
              <div className="products-items">
                <img className="allproduct-product-icon" src={item.image} alt=""/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.new_price}</p>
                <p>${item.old_price}</p>
                <p>{item.quantity}</p>
                <p className="allproduct-icon" onClick={() => handleUpdate(item.id)}><i className="fas fa-edit"></i></p>
                <p className="allproduct-icon" onClick={() => removeProductApi(item.id)}><i className="fa fa-times"></i></p>
                </div>
                <hr />
              </div>
            );
        }):<h2 style={{marginTop:"30px"}}>No Products Found In DB</h2>}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductList;