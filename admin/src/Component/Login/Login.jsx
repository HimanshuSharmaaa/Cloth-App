import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";
import "./Login.css";

const Login = () => {
  const { adminlogin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await adminlogin(userInfo);
    console.log(res);
    if (res) {
      setUserInfo({ email: "", password: "" });
      navigate("/");
      if(res.status === 200) {
        localStorage.setItem('token',res.result);
      }
      alert(res.message);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="login-card-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input className="input" id="email" value={userInfo.email} name="email" onChange={handleChange} type="email" required placeholder="Enter Email Here.." aria-label="Email"/>
        <input className="input" id="password" value={userInfo.password} name="password" onChange={handleChange} type="password" required placeholder="Enter Password Here.." aria-label="Password" autoComplete="current-password"/>
        <label className="input-checkbox">
          <input type="checkbox" required/> 
          By Continuing, I agree to the terms of use & privacy policy.
        </label>
        <input className="input button" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;