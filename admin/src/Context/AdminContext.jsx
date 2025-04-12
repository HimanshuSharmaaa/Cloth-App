import { createContext, useState } from "react";
export const AdminContext = createContext();

const AdminState = ({ children }) => {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const adminlogin = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:4000/api/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const resJson = await res.json();
      console.log(resJson);
      if (!resJson) return false;
      return resJson || false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ adminlogin, setIsLoggedIn, isLoggedIn }}>{children}</AdminContext.Provider>
  );
};

export default AdminState;