import React, { useState } from "react";
import "./ExclusiveOffer.css";

const ExclusiveOffer = ({notify,setLoad}) => {
  const[email,setEmail] = useState('');
  const regex = /^[a-zA-Z0-9._%+-]+@(?:gmail\.com|yahoo\.com|example\.net|mycompany\.co\.uk|google\.com|kpmg\.com|amazon\.com|microsoft\.com|[a-zA-Z0-9.-]+\.edu\.in)$/;

  const handleSentEmail = async() => {
    if(!regex.test(email)){
      notify('Enter Valid Email Address.');
      return;
    }
    setLoad(20);
    try {
      const res = await fetch('http://localhost:4000/api/sendEmail',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
      });
      setLoad(50);
      if (!res.ok) {
        notify('An error occurred while sending the request.');
        throw new Error('Failed to send email');
      }
      setLoad(70);
      const result = await res.json();
      notify('Successfully connected for future updates.');
      console.log('Email sent:', result);
      setEmail('');
      setLoad(100);
    } catch (error) {
      setLoad(10);
      notify('An error occurred while connecting with you.');
      console.error(error);
      setLoad(100);
    }
  };

  return (
    <div className="exclusive-offer-container">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div className="exclusive-offer-input-container">
        <input type="email" value={email} placeholder="Enter your email id" onChange={(e)=>setEmail(e.target.value)}/>
        <button onClick={handleSentEmail}>Subscribe</button>
      </div>
    </div>
  );
};

export default ExclusiveOffer;