import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import ProductState from "./Context/ProductContext";
import AdminState from "./Context/AdminContext";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductState>
      <AdminState>
        <App />
      </AdminState>
    </ProductState>
  </React.StrictMode>
);

reportWebVitals();