import React from "react";
import img from "../../assets/imgs/shampoo1.jpg";
import "./style.css";

const QuickView = () => {
  return (
    <div className="product-modal">
      <div className="product-modal__wrapper">
        <div className="product-modal__img">
          <img src={img} alt="" />
        </div>
        <div className="product-modal__info">
          <i className="fa fa-close" />
          <h3>Product title</h3>
          <h4>Ksh 1600</h4>
          <div className="underline" />
          <div className="product-add">
            <h5>Quantity</h5>
            <div className="qty-selection">
              <a field="quantity" className="down quantity-control-down">
                -
              </a>
              <input
                type="text"
                min="1"
                name="quantity"
                value="1"
                className="quantity"
              />
              <a field="quantity" className="up quantity-control-up">
                +
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
