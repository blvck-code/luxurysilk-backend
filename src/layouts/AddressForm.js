import React, { useState, useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { connect } from "react-redux";
import { saveAddress } from "../redux/action/address";
import { fetchAddress } from "../redux/action/address";

const AddressForm = ({ fetchAddress, addresses, loading }) => {
  useEffect(() => {
    fetchAddress();
  }, []);

  const openModal = () => {
    document.querySelector(".add-address").classList.remove("hide");
  };

  return (
    <div className="checkout_content-item">
      <div className="checkout_content-item__title">
        <h3>
          <FiCheckCircle />
          1. address details
        </h3>
        <div className="add-address" onClick={() => openModal()}>
          <i className="fa fa-plus" /> Add New Address
        </div>
      </div>
      <div className="underline" />
      <div className="address_list">
        {loading && <h2>loading</h2>}
        {addresses &&
          addresses?.map((address) => (
            <div
              className={
                address?.active ? "address_item active" : "address_item"
              }>
              <div className="address_item-title">
                <h4>
                  {address.first_name} {address.last_name}
                </h4>
                {address.default && <span>Default</span>}
              </div>
              <p className="text-muted address-place">
                {address.delivery_address}
              </p>
              <h5 className="address-town">{address.state_or_region}</h5>
              <p className="text-muted address-phone">
                +254 {address.phone_number}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  addresses: state.address.address,
  loading: state.address.loading,
});

export default connect(mapStateToProps, { fetchAddress })(AddressForm);
