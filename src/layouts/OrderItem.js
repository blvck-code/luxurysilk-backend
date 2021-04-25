import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getImage } from "../utils";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  handleRemoveFromCart,
  handleAddToCart,
} from "../redux/action/products";
import { removeFromCart } from "../redux/action/cart";

const OrderItem = ({ item, handleAddToCart, removeFromCart }) => {
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    setQuantity(item?.quantity);
  }, []);

  const code = item?.item_obj.ref_code;

  const handleAdd = () => {
    setQuantity(quantity + 1);
    let qty = quantity + 1;
    handleAddToCart(code, qty);
  };

  const handleReduce = () => {
    setQuantity(quantity - 1);
    let qty = quantity - 1;

    if (qty < 1) {
      removeFromCart(code);
    } else {
      handleAddToCart(code, qty);
    }
  };

  const handleRemove = (code) => {
    removeFromCart(code);
  };

  const addCart2 = (
    <div className="cart-item__add">
      <FiMinus onClick={() => handleReduce()} />
      <span className="cart-item__quantity">{quantity}</span>
      <FiPlus onClick={() => handleAdd()} />
    </div>
  );

  return (
    <>
      <div className="cart-item">
        <div className="cart-item__detail">
          <img src={getImage(item?.item_obj.image)} alt={item.item} />
          <div>
            <span className="text-muted">
              {item?.item_obj.category}/{item?.item_obj.hair_type}
            </span>
            <h3>{item?.item}</h3>
            <div
              onClick={() => handleRemove(item?.item_obj.ref_code)}
              className="remove">
              <i className="fa fa-trash" /> remove
            </div>
          </div>
        </div>
        <div className="cart-item__qty">{addCart2}</div>
        <div className="cart-item__price">
          <h3>KES {item?.item_obj.price}</h3>
        </div>
        <div className="cart-item__subtotal">
          <h3>KES {(quantity * item?.item_obj.price).toFixed(2)}</h3>
        </div>
      </div>
    </>
  );
};

export default connect(null, { handleAddToCart, removeFromCart })(OrderItem);
