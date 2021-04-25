import React from "react";
import { IoMdClose } from "react-icons/io";
import "./style.css";

const closeModal = () => {
  document.querySelector(".modal-overlay").classList.add("hide");
  document.querySelector(".shipping-modal").classList.add("hide");
};

const ShippingModal = () => {
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      document.querySelector(".modal-overlay").classList.add("hide");
      document.querySelector(".shipping-modal").classList.add("hide");
    }
  });
  return (
    <div className="modal-overlay hide shipping-modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <span className="modal-title">Shipping policy</span>
          <div className="modal-title__btn">
            <IoMdClose onClick={() => closeModal()} />
          </div>
        </div>
        <div className="underline" />
        <div className="shipping-content">
          <div className="shipping-content__item">
            <p>Turnaround</p>
            <p>
              All orders within Nairobi and its environment will be shipped
              within 24-48 hours between Monday-Friday, 9am-5pm. Orders outside
              Nairobi but within Kenya will be shipped between 2-3 working days.
              Before your package is dropped, you will be notified by a member
              of the Luxury Silk team.
            </p>
          </div>
          <div className="shipping-content__item">
            <p>Shipping Rates</p>
            <p>
              The rates charged for the shipping of your order is based on the
              region/geographical location the you're in. Before the final
              checkout page, you will be shown what the cost of shipping will
              be, and you will have a chance to not place your order if you
              decide not to.
            </p>
          </div>
          <div className="shipping-content__item">
            <p>Back Orders</p>
            <p>
              If an item goes on back order we will ship you the part of your
              order that is in stock. When the item becomes available we will
              ship you the rest of your order. You will not be charged any
              additional shipping and handling for the second shipment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingModal;
