import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { IoMdTrash } from "react-icons/io";
import img from "../assets/imgs/moisturizer4.jpg";
import img2 from "../assets/imgs/moisturizer5.jpg";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart } from "../redux/action/cart";
import { getImage } from "../utils";
import { handleAddToCart } from "../redux/action/products";
import OrderItem from "./OrderItem";
import { FiMinus, FiPlus } from "react-icons/fi";

const OrderSummary = ({ cart, fetchCart, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchCart();
  }, []);

  let items = cart?.order_items;
  // const code = item?.item_obj.ref_code;
  console.log(items);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    console.log(quantity);
    // handleAddToCart(code, quantity);
  };

  const handleAddQty = (qty) => {
    console.log((qty += 1));
  };

  document.title =
    "Shopping Cart | Luxury Silk Online, High Quality Hair Products. Nairobi, Kenya.";

  return (
    <React.Fragment>
      <div className="title">
        <p className="title-nav">
          <Link to="/">Home</Link>/<span>Shopping Cart</span>
        </p>
        <h2 className="title-name">Your Shopping Cart</h2>
      </div>
      <div className="cart">
        <Container className="cart-wrapper">
          <h1 className="cart-title">
            Shopping Cart
            {/* (
            {cart?.order_items.length > 1
              ? `${cart?.order_items.length} items`
              : `${cart?.order_items.length} item`}
            ) */}
          </h1>
          <div className="cart-content">
            <div className="cart-header">
              <h3>item</h3>
              <h3>quantity</h3>
              <h3>unit price</h3>
              <h3>subtotal price</h3>
            </div>
            <div className="cart-body">
              {items &&
                items?.map((item) => (
                  <OrderItem item={item} />
                  // <div className="cart-item">
                  //   <div className="cart-item__detail">
                  //     <img
                  //       src={getImage(item?.item_obj.image)}
                  //       alt={item.item}
                  //     />
                  //     <div>
                  //       <span className="text-muted">
                  //         {item?.item_obj.category}/{item?.item_obj.hair_type}
                  //       </span>
                  //       <h3>{item?.item}</h3>
                  //       <div className="remove">
                  //         <i className="fa fa-trash" /> remove
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="cart-item__qty">
                  //     <div className="cart-item__add">
                  //       <FiMinus onClick={() => handleAddQty(item?.quantity)} />
                  //       <span className="cart-item__quantity">
                  //         {item?.quantity}
                  //       </span>
                  //       <FiPlus onClick={() => handleAdd()} />
                  //     </div>
                  //   </div>
                  //   <div className="cart-item__price">
                  //     <h3>KES {item?.item_obj.price}</h3>
                  //   </div>
                  //   <div className="cart-item__subtotal">
                  //     <h3>KES {item?.final_price.toFixed(2)}</h3>
                  //   </div>
                  // </div>
                ))}
            </div>
          </div>
        </Container>
        <Container className="cart-subtotal">
          <div></div>
          <p className="text-muted">Local delivery fee not included</p>
        </Container>
        <div className="cart-nav">
          <Container className="cart-nav__wrapper">
            <Link to="/collections/all-products">continue shopping</Link>
            <Link className="checkbox-btn" to="/checkout">
              proceed to checkout
            </Link>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.shoppingCart,
});

export default connect(mapStateToProps, { fetchCart, handleAddToCart })(
  OrderSummary
);
