import React, { useEffect, useState, Component } from "react";
import { Button, Container, DropdownDivider } from "semantic-ui-react";
import { fetchCart } from "../redux/action/cart";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { authAxios, config, getImage } from "../utils";
import { addAddress } from "../redux/action/address";
import { FiChevronRight } from "react-icons/fi";
import { shippingFeeURL, shippingSummaryURL } from "../constant";
import visaImg from "../assets/imgs/payments/logo_visa.png";
import mastercardImg from "../assets/imgs/payments/logo_mastercard.png";
import mpesaImg from "../assets/imgs/payments/logo_mpesa.png";
import ShippingModal from "../modals/Shipping/ShippingModal";

const Payment = ({ fetchCart, cart }) => {
  const [details, setDetails] = useState({});
  const [useMpesa, setUseMpesa] = useState(false);
  const [useCard, setUseCard] = useState(false);
  const [method, setMethod] = useState(null);

  useEffect(() => {
    fetchCart();
    getShippingSummary();
  }, []);

  const getShippingSummary = () => {
    authAxios
      .get(shippingSummaryURL)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shipRegion = (price) => {
    if (price === 1000.0) {
      return "Shipping outside Kenya but within East Africa.";
    } else if (price === 500.0) {
      return "Shipping outside Nairobi but within Kenya e.g Thika, Athi River, Nakuru, Kisumu...";
    } else if (price === 400.0) {
      return "Shipping in greater Nairobi areas e.g Limuru, Syokimau, Ngong, Rongai, Ruiru, Utawala...";
    } else {
      return "Shipping within Nairobi";
    }
  };

  const shippingModal = () => {
    document.querySelector(".modal-overlay").classList.remove("hide");
    document.querySelector(".shipping-modal").classList.remove("hide");
  };

  let cartItems = cart?.order_items;
  const history = useHistory();

  if (cartItems?.length < 1) {
    return history.goBack();
  }

  document.title = `Payment | Luxury Silk Online`;
  return (
    <>
      <ShippingModal />
      <Container className="checkout">
        <div className="checkout__wrapper">
          <div className="checkout-address">
            <div className="title-secondary">
              <h1>Luxury Silk</h1>
              <p className="title-nav">
                <Link to="/checkout">Information</Link> <FiChevronRight />{" "}
                <Link to="/shipping">Shipping</Link> <FiChevronRight />{" "}
                <Link to="/payment" className="active">
                  Payment
                </Link>
              </p>
            </div>
            <div className="user-details">
              <div className="user-details__item">
                <div>
                  <span>Contact</span>
                  {details?.contact && <p>+254 {details?.contact}</p>}
                </div>
                <Link to="/checkout">Change</Link>
              </div>
              <div className="user-details__item">
                <div>
                  <span>Ship to</span>
                  {details && (
                    <p>
                      {details?.address}, {details?.postal_code},{" "}
                      {details?.city}, {details?.apartment},{" "}
                      {details?.country_or_region}
                    </p>
                  )}
                </div>
                <Link to="/checkout">Change</Link>
              </div>
              {details?.fee && (
                <div className="user-details__item">
                  <div>
                    <span>Method</span>
                    <p>
                      {shipRegion(details?.fee)},
                      <span> KES {details?.fee}</span>
                    </p>
                  </div>
                  <Link to="/shipping">Change</Link>
                </div>
              )}
            </div>
            <div className="shipping-method payments">
              <h1>Payment</h1>
              <p>All transactions are secured and encrypted</p>
              <form className="payment-methods">
                <p>choose a new payment method</p>
                <div className="payment-method card">
                  <div className="payment-header">
                    <div>
                      <input
                        type="radio"
                        checked={useCard}
                        onClick={() => {
                          setUseMpesa(false);
                          setUseCard(true);
                          setMethod("card");
                        }}
                      />
                      <h4>bank card</h4>
                    </div>
                    <div>
                      <img src={mastercardImg} alt="mastercard" />
                      <img src={visaImg} alt="visa" />
                    </div>
                  </div>
                  <div className="underline" />
                  <div
                    className={
                      useCard
                        ? "payment-content card"
                        : "payment-content card hide"
                    }>
                    <div className="input-group">
                      <input type="text" placeholder="Card Number" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="expiredate">Expire Date</label>
                      <div className="input-tripple">
                        <input type="text" placeholder="MM" />
                        <input type="text" placeholder="YY" />
                        <input type="text" placeholder="CVV" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="payment-method mpesa">
                  <div className="payment-header">
                    <div>
                      <input
                        type="radio"
                        checked={useMpesa}
                        onClick={() => {
                          setUseMpesa(true);
                          setUseCard(false);
                          setMethod("mpesa");
                        }}
                      />
                      <h4>mpesa</h4>
                    </div>
                    <div>
                      <img src={mpesaImg} alt="mastercard" />
                    </div>
                  </div>
                  <div className="underline" />
                  <div
                    className={
                      useMpesa
                        ? "payment-content mpesa"
                        : "payment-content mpesa hide"
                    }>
                    <div className="input-group">
                      <select>
                        <option value="0">M-PESA</option>
                        {/* <option value="0">AIRTEL MONEY</option> */}
                      </select>
                    </div>
                    <div className="input-group phone">
                      <div className="phone_code">+254</div>
                      <div className="phone-number">
                        <label htmlFor="number">phone number</label>
                        <input
                          required
                          placeholder="E.g 79000000"
                          // value={contact}
                          // onChange={(e) => setContact(e.target.value)}
                          maxLength="9"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button type="submit">pay now: kes {cart?.order_final}</Button>
              </form>
              <div className="checkout-nav">
                <Link to="/shipping">
                  <i className="fa fa-chevron-left" />
                  Return to shipping
                </Link>
              </div>
            </div>
          </div>
          <div className="checkout-summary hide-mobile">
            <h3 className="checkout-title">Order summary</h3>
            {cartItems?.length === 0 && (
              <>
                <div className="checkout-summary__empty">
                  <p>Your cart is empty</p>
                  <Link to="/all-products">Continue Shopping</Link>
                </div>
              </>
            )}
            {cartItems?.length > 0 && (
              <>
                <div
                  className={
                    cart?.order_items.length > 3
                      ? "checkout-orders scroll"
                      : "checkout-orders"
                  }>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div className="checkout-order">
                        <div className="checkout-order__img">
                          <img
                            src={getImage(item.item_obj.image)}
                            alt={item?.item}
                          />
                          <span>{item?.quantity}</span>
                        </div>
                        <div className="checkout-order__detail">
                          <h3>{item?.item}</h3>
                          <p className="text-muted">
                            {item?.item_obj.weight} / {item?.item_obj.category}{" "}
                            / Peppermint
                          </p>
                        </div>
                        <h3>KSh. {item?.final_price.toFixed(2)}</h3>
                      </div>
                    ))}
                </div>
                <div className="underline" />
                <div className="checkout-subtotal">
                  <div>
                    <h3 className="text-muted">Subtotal</h3>
                    <h3 className="checkout-subtotal__price">
                      KES. {cart?.total.toFixed(2)}
                    </h3>
                  </div>
                  <div>
                    <h3 className="text-muted">
                      Shipping{" "}
                      <i
                        className="fa fa-question"
                        onClick={() => shippingModal()}
                      />
                    </h3>
                    <p className="text-muted">KES. {details?.fee}</p>
                  </div>
                </div>
                <div className="underline" />
                <div className="checkout-total">
                  <h3>Total</h3>
                  <h2>KSh. {cart?.order_final.toFixed(2)}</h2>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.shoppingCart,
});

export default connect(mapStateToProps, { fetchCart, addAddress })(Payment);
