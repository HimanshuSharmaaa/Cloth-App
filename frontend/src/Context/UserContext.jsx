import { createContext, useState, useEffect } from "react";
export const UserContext = createContext();

const UserState = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState('Login');
  const url = "http://localhost:4000/api/auth";

  useEffect(() => {
    if (localStorage.getItem("token")) setIsAuthenticated(true);
  }, []);

  // CreateUserState
  const createUserState = async ({ name, email, password }) => {
    try {
      const res = await fetch(`${url}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem("token", json.result);
        return true;
      } else return false;
    } catch (error) {
      console.error("Error occur in createUserState : ", error);
    }
  };

  // login user
  const loginUserState = async ({ email, password }) => {
    try {
      const res = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem("token", json.result);
        return true;
      } else return false;
    } catch (error) {
      console.log("Error occur in createUserState : ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        createUserState,
        loginUserState,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;