import React, { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { fetchCart } from "../redux/action/cart";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { authAxios, getImage, config } from "../utils";
import { addAddress } from "../redux/action/address";
import { Redirect } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import {
  countyListURL,
  cityListURL,
  orderAddAddressURL,
  shippingSummaryURL,
  updateAddressURL,
  userIdURL,
} from "../constant";
import ShippingModal from "../modals/Shipping/ShippingModal";

const Checkout = ({ fetchCart, cart, addAddress }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [userID, setUserID] = useState(null);
  const [counties, setCounties] = useState([]);
  const [makeDefault, setMakeDefault] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState(null);
  const [update, setUpdate] = useState(false);
  const [county, setCounty] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCart();
    handleFetchCounties();
    handleFetchCities();
    getShippingSummary();
    getUserID();
  }, []);

  useEffect(() => {
    if (details) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }

    setFirstname(details?.first_name);
    setLastname(details?.last_name);
    setContact(details?.contact);
    setAddress(details?.address);
    setApartment(details?.apartment);
    setCity(details?.city);
    setCounty(details?.state_or_region);
    setMakeDefault(details?.default);
  }, [details]);

  console.log(details);

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

  const getUserID = () => {
    authAxios
      .get(userIdURL)
      .then((res) => {
        setUserID(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let id = userID?.userID;

  const handleFormatData = (counties) => {
    const keys = Object.keys(counties);
    return keys.map((k) => {
      return {
        key: k,
        text: counties[k],
        value: k,
      };
    });
  };

  const handleFetchCounties = () => {
    authAxios
      .get(countyListURL)
      .then((res) => {
        setCounties(handleFormatData(res.data));
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleFetchCities = () => {
    authAxios
      .get(cityListURL)
      .then((res) => {
        setCities(handleFormatData(res.data));
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      user: id,
      contact,
      first_name: firstname,
      last_name: lastname,
      address,
      apartment,
      city,
      state_or_region: county,
      default: makeDefault,
    };

    update
      ? authAxios
          .put(updateAddressURL(details?.id), data, config)
          .then((res) => {
            setSaving(false);
            setSuccess(true);
          })
          .catch((err) => setError(err))
      : authAxios
          .post(orderAddAddressURL, data, config)
          .then((res) => {
            setSaving(false);
            setSuccess(true);
          })
          .catch((err) => setError(err));
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
    return <Redirect to="/shipping" />;
  }

  document.title = `Checkout ( ${cart?.order_items.length} items ) | Luxury Silk Online`;
  return (
    <>
      <ShippingModal />
      <Container className="checkout">
        <div className="checkout__wrapper">
          <div className="checkout-address">
            <div className="title-secondary">
              <h1>Luxury Silk</h1>
              <p className="title-nav">
                <Link to="/checkout" className="active">
                  Information
                </Link>{" "}
                <FiChevronRight /> <span>Shipping</span> <FiChevronRight />{" "}
                <span>Payment</span>
              </p>
            </div>
            <form
              className="shipping-form"
              onSubmit={(e) => handleSubmitAddress(e)}>
              <div className="shipping-contact">
                <h3>Contact information</h3>
                <div>
                  <label htmlFor="contact">Mobile number *</label>
                  <div className="input__inline">
                    <div className="input-group phone">
                      <div className="phone_code">+254</div>
                      <input
                        required
                        placeholder="E.g 79000000"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        maxLength="9"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="shipping-data">
                <h3>Delivery address</h3>
                <div className="input-inline">
                  <div className="input-group firstname">
                    <label htmlFor="firstname">First name *</label>
                    <input
                      required
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="input-group lastname">
                    <label htmlFor="lastname">Last name *</label>
                    <input
                      required
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group address">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-group apartment">
                  <label htmlFor="apartment">Apartment, suite, etc. *</label>
                  <input
                    required
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    type="text"
                  />
                </div>

                <div className="input-inline">
                  <div className="input-group state">
                    <label htmlFor="city">County / Region *</label>
                    <select
                      required
                      onChange={(e) => setCounty(e.target.value)}
                      loading={counties.length < 1}>
                      <option value="0">Please select...</option>
                      {counties &&
                        counties.map((item) => (
                          <option key={item.k} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="input-group city">
                    <label htmlFor="city">City *</label>
                    <select
                      required
                      onChange={(e) => setCity(e.target.value)}
                      loading={cities.length < 1}>
                      <option value="0">Please select...</option>
                      {cities &&
                        cities.map((item) => (
                          <option key={item.k} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="input-default">
                  <input
                    type="checkbox"
                    checked={makeDefault === true ? true : false}
                    onChange={() => setMakeDefault(!makeDefault)}
                  />
                  <span>Make this default address?</span>
                </div>
              </div>
              <div className="checkout-nav">
                <Link to="/order-summary">
                  <i className="fa fa-chevron-left" />
                  Return to cart
                </Link>
                {cartItems?.length > 0 && (
                  <Button
                    loading={saving}
                    disabled={saving}
                    type="submit"
                    className="checkbox-btn">
                    Continue to shipping
                  </Button>
                )}
              </div>
            </form>
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
                    <p className="text-muted">Calculated at payment step</p>
                  </div>
                </div>
                <div className="underline" />
                <div className="checkout-total">
                  <h3>Total</h3>
                  <h2>KSh. {cart?.total.toFixed(2)}</h2>
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

export default connect(mapStateToProps, { fetchCart, addAddress })(Checkout);
