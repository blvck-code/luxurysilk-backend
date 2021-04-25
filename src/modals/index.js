import React from "react";
import { IoMdClose } from "react-icons/io";
import "./style.css";

const Modal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-header">
          <span className="modal-title">Add New Address</span>
          <div className="modal-title__btn">
            <IoMdClose />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
