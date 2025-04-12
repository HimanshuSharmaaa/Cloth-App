import { createContext, useState } from "react";
export const ProductContext = createContext();

const ProductState = (props) => {
  let [allProduct, setAllProduct] = useState([]);
  let url = "http://localhost:4000/api/product";

  const addProductApi = async (productDetail, uploadImage) => {
    try {
      let product = productDetail;
      let formData = new FormData();
      formData.append("product", uploadImage);
      const resImg = await fetch("http://localhost:4000/uploads", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const resImgData = await resImg.json();
      if (resImgData.success) {
        product.image = resImgData.Address;
        const resProduct = await fetch(
          "http://localhost:4000/api/product/add",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        const resProductData = await resProduct.json();
        console.log(resProductData);
        alert('Product added successfully');
      }
    } catch (error) {
      console.error("Error occur in addProductApi : ", error);
    }
  };

  const removeProductApi = async (id) => {
    try {
      let res = await fetch(`${url}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Tpye": "application-json",
        },
      });
      let resJson = await res.json();
      if (resJson.success) setAllProduct(allProduct.filter((ele) => ele.id !== id));
      alert('Product removed successfully');
    } catch (error) {
      console.error("Error occur in removeProductApi : ", error);
    }
  };

  const fetchAllProductApi = async () => {
    try {
      let res = await fetch(`${url}/fetchAllProduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application-json",
        },
      });
      let resJson = await res.json();
      if (resJson.success) {
        setAllProduct(resJson.result);
        console.log(resJson);
      }
    } catch (error) {
      console.error("Error occur in fetchAllProductApi : ", error);
    }
  };

  const updateProductApi = async (id, updatedProduct, uploadImage) => {
    try {
      let resJson;
      if (typeof updatedProduct.image === "object") {
        let product = updatedProduct;
        let formData = new FormData();
        formData.append("product", uploadImage);
        const resImg = await fetch("http://localhost:4000/uploads", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });
        const resImgData = await resImg.json();
        console.log(resImgData);
        if (resImgData.success) {
          product.image = resImgData.Address;
          let res = await fetch(`${url}/updateProduct/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });
          resJson = await res.json();
          console.log(resJson);
        }
      } else {
        let res = await fetch(`${url}/updateProduct/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });
        resJson = await res.json();
        console.log(resJson);
      }
      // making deep copy of notes because we can't change the notes directly here but we can change the deepcopy
      let newproducts = JSON.parse(JSON.stringify(allProduct));

      if (resJson.success) {
        for (let i = 0; i < newproducts.length; i++) {
          if (newproducts[i].id === id) {
            newproducts[i].name = updatedProduct.name;
            newproducts[i].image = updatedProduct.image;
            newproducts[i].category = updatedProduct.category;
            newproducts[i].new_price = updatedProduct.new_price;
            newproducts[i].old_price = updatedProduct.old_price;
            newproducts[i].quantity = updatedProduct.quantity;
            break;
          }
        }
      }
      setAllProduct(newproducts);
      alert('Product Updated successfully');
    } catch (error) {
      console.error("Error occur in updateProductApi : ", error);
    }
  };

  return (
    <ProductContext.Provider value={{ addProductApi, removeProductApi, fetchAllProductApi, updateProductApi, allProduct }}
    >{props.children}</ProductContext.Provider>
  );
};

export default ProductState;