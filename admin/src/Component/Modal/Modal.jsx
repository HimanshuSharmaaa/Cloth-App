import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div style={{marginTop:"40px"}} className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;