import ShopContextProvider from "./Context/ShopContext";
import reportWebVitals from "./reportWebVitals";
import UserState from "./Context/UserContext";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserState>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </UserState>
  </React.StrictMode>
);

reportWebVitals();