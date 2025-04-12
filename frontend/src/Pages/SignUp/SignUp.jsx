import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import "./SignUp.css";

const SignUp = ({notify}) => {
  let navigate = useNavigate();
  const ref = useRef(null);
  let { loginUserState, createUserState, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleTermsAndCondition = (e) => {
    ref.current.click();
  }

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if(isAuthenticated === 'Login'){
      if (await loginUserState(userInfo)) {
        setIsAuthenticated('Login');
        navigate("/");
        notify('Successfully Login');
      } else notify('Invalid Credentails');
    } else {
      if (await createUserState(userInfo)) {
        setIsAuthenticated('Login');
        navigate("/");
        notify('Successfully registered');
      } else notify('Email Already Registered');
    }
    setUserInfo({ name: "", email: "", password: "" });
  };

  return (
    <div className="signUp-container">
      <form className="signUp-card-container" onSubmit={handleClick}>
        <h1>{isAuthenticated}</h1>
        {isAuthenticated!=='Login'?<input className="input" id="name" value={userInfo.name} name="name" onChange={handleChange} type="name" required placeholder="Enter Name Here.."/>:<></>}
        <input className="input" id="email" value={userInfo.email} name="email" onChange={handleChange} type="email" required placeholder="Enter Email Here.."/>
        <input className="input" id="password" value={userInfo.password} name="password" onChange={handleChange} type="password" required placeholder="Enter Password Here.."/>
        <input className="input button" type="submit" placeholder="Submit" />
        {isAuthenticated!=='Login'?<p className="input-checkbox">Already have an account?{" "}<b className="input-switch-button" onClick={()=>setIsAuthenticated('Login')}>Click ME</b></p>:<p className="input-checkbox">Create new account?{" "}<b className="input-switch-button" onClick={()=>setIsAuthenticated('Sign Up')}>Click ME</b></p> }
        <p className="input-checkbox" onClick={handleTermsAndCondition}><input ref={ref} type="checkbox" id='terms' required /> By Continuing, I agree to the terms of use & privacy policy.</p>
      </form>
    </div>
  );
};

export default SignUp;