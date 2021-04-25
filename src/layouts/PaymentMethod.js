import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Button } from "semantic-ui-react";

const PaymentMethod = () => {
  return (
    <div className="checkout_content-item">
      <h3 className="checkout_content-item__title">
        <FiCheckCircle />
        3. payment method
      </h3>
      <div className="underline" />
      <form className="address_form hide">
        <div className="input__inline">
          <div className="input__group">
            <label htmlFor="firstname">First Name *</label>
            <input type="text" value="Maurice" />
          </div>
          <div className="input__group">
            <label htmlFor="lastname">Last Name *</label>
            <input type="text" value="Oluoch" />
          </div>
        </div>
        <div className="input__group mobile">
          <label htmlFor="phone">Mobile phone number *</label>
          <div>
            <span className="phone_code">+254</span>
            <input type="text" value="795772333" />
          </div>
        </div>
        <div className="input__group address">
          <label htmlFor="address">Delivery Address*</label>
          <textarea rows="5" value="P.O Box 144, Siaya" />
        </div>
        <div className="input__group extra">
          <label htmlFor="extra">Additional Info</label>
          <textarea rows="5" value="Siaya District Hospital" />
        </div>
        <div className="input__group state">
          <label htmlFor="state/region">State/Region *</label>
          <select>
            <option value="siaya">Siaya</option>
            <option value="kisumu">Kisumu</option>
          </select>
        </div>
        <div className="input__group state">
          <label htmlFor="city">City *</label>
          <select>
            <option value="siaya">Siaya Town</option>
            <option value="kisumu">Kisumu Town</option>
          </select>
        </div>
        <p className="required">Required *</p>
        <Button type="submit">Save and continue</Button>
      </form>
    </div>
  );
};

export default PaymentMethod;
