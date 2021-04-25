import React, { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { fetchCart } from "../redux/action/cart";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { authAxios, config, getImage } from "../utils";
import { addAddress } from "../redux/action/address";
import { FiChevronRight } from "react-icons/fi";
import { shippingFeeURL, shippingSummaryURL } from "../constant";
import ShippingModal from "../modals/Shipping/ShippingModal";

const Shipping = ({ fetchCart, cart, addAddress }) => {
  const [details, setDetails] = useState({});
  const [fee, setFee] = useState(300.0);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCart();
    getShippingSummary();
    setSuccess(false);
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

  const handleSelect = (e) => {
    const radios = document.querySelectorAll(".radio-fee").forEach((radio) => {
      radio.checked = false;
    });
    e.target.checked = true;
    setFee(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    const body = JSON.stringify({
      fee,
    });

    authAxios
      .post(shippingFeeURL, body, config)
      .then((res) => {
        setSaving(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
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

  if (success) {
    return <Redirect to="/payment" />;
  }

  document.title = `Shipping | Luxury Silk Online`;
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
                <Link className="active" to="/shipping">
                  Shipping
                </Link>{" "}
                <FiChevronRight /> <span>Payment</span>
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
            </div>
            <div className="shipping-method">
              <h1>Shipping Method</h1>
              <div className="shipping-method__content">
                <div className="method_item">
                  <div>
                    <input
                      className="radio-fee"
                      onChange={(e) => handleSelect(e)}
                      type="radio"
                      value="300.00"
                    />
                    <p className="shipping__place">Shipping within Nairobi</p>
                  </div>
                  <p className="shipping__price">KES 300.00</p>
                </div>
                <div className="method_item">
                  <div>
                    <input
                      onChange={(e) => handleSelect(e)}
                      className="radio-fee"
                      type="radio"
                      value="400.00"
                    />
                    <p className="shipping__place">
                      Shipping in greater Nairobi areas e.g Limuru, Syokimau,
                      Ngong, Rongai, Ruiru, Utawala, Buruburu, Ruaka, Lower
                      Kabete, Juja etc.
                    </p>
                  </div>
                  <p className="shipping__price">KES 400.00</p>
                </div>
                <div className="method_item">
                  <div>
                    <input
                      onChange={(e) => handleSelect(e)}
                      className="radio-fee"
                      type="radio"
                      value="500.00"
                    />
                    <p className="shipping__place">
                      Shipping outside Nairobi but within Kenya e.g Thika, Athi
                      River, Nakuru, Kisumu, Eldoret, Meru, Murang'a, Embu etc.
                    </p>
                  </div>
                  <p className="shipping__price">KES 500.00</p>
                </div>
              </div>
              <div className="checkout-nav">
                <Link to="/checkout">
                  <i className="fa fa-chevron-left" />
                  Return to information
                </Link>
                {cartItems?.length > 0 && (
                  <Button
                    loading={saving}
                    disabled={saving || !fee}
                    onClick={(e) => handleSubmit(e)}
                    className="checkbox-btn">
                    Continue to payment
                  </Button>
                )}
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
                      KSh. {cart?.total.toFixed(2)}
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
                    <p className="text-muted">KSh. {fee}</p>
                  </div>
                </div>
                <div className="underline" />
                <div className="checkout-total">
                  <h3>Total</h3>
                  <h2>KSh. {cart?.total}</h2>
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

export default connect(mapStateToProps, { fetchCart, addAddress })(Shipping);
