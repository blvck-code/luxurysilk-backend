import React, { useEffect } from "react";
import { FiChevronDown, FiUser, FiShoppingCart } from "react-icons/fi";
import { RiHeartLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/logo.jpg";
import { connect } from "react-redux";
import { fetchCart } from "../../redux/action/cart";
import "./style.css";
import { Container } from "semantic-ui-react";
import { logOut } from "../../redux/action/auth";

const Nav = ({ fetchCart, cart, auth, logOut }) => {
  useEffect(() => {
    fetchCart();
  }, []);

  let cartItems = cart?.order_items;

  const { pathname } = useLocation();

  localStorage.setItem("cart", JSON.stringify(cartItems));

  useEffect(() => {
    const stickyEl = document?.querySelector(".sticky");
    const stickyPos = stickyEl?.getBoundingClientRect().top;
    const offset = -20;

    console.log(stickyEl);

    window.addEventListener("scroll", () => {
      if (window.pageXOffset >= stickyPos + offset) {
        // stickyEl.style.position = "fixed";
        // stickyEl.style.top = "0px";
        stickyEl.classList.add("fixed");
      } else if (window.pageXOffset <= stickyPos + offset) {
        // stickyEl.style.position = "static";
        // stickyEl.style.top = "";
        stickyEl.classList.remove("fixed");
      }
    });
  }, []);

  const stickyEl = document.querySelector(".sticky");

  const offset = -20;

  // window.addEventListener("scroll", () => {
  //   if (stickyEl) {
  //     const stickyPos = stickyEl.getBoundingClientRect().top;
  //     if (window.pageXOffset >= stickyPos + offset) {
  //       // stickyEl.style.position = "fixed";
  //       // stickyEl.style.top = "0px";
  //       // stickyEl.style.width = "100%";
  //       // stickyEl.style.zIndex = "100";
  //       stickyEl.classList.add("fixed");
  //     } else if (window.pageXOffset <= stickyPos + offset) {
  //       stickyEl.classList.remove("fixed");
  //       // stickyEl.style.position = "static";
  //       // stickyEl.style.top = "";
  //     }
  //   }
  // });

  console.log(pathname);

  return (
    <>
      {(pathname === "/set-password" ||
        pathname === "/set-password-success" ||
        pathname === "/reset-password") && (
        <div className="nav-password">
          <Container className="nav-password__wrapper">
            <Link to="/" className="nav-logo">
              <img src={logo} alt="luxury silk" />
              <h1>luxury silk</h1>
            </Link>
            <div className="nav-links">
              <Link to="/login">Sign in</Link>
              <Link className="nav-links__register" to="/register">
                Join now
              </Link>
            </div>
          </Container>
        </div>
      )}

      {pathname !== "/payment" &&
        pathname !== "/checkout" &&
        pathname !== "/set-password" &&
        pathname !== "/set-password-success" &&
        pathname !== "/reset-password" &&
        pathname !== "/shipping" &&
        pathname !== "/login" &&
        pathname !== "/register" && (
          <>
            <div id="nav" className="nav">
              <div className="nav-top">
                <div className="nav-socials">
                  <Link to="">
                    <i className="fa fa-facebook-f" />
                  </Link>
                  <Link to="">
                    <i className="fa fa-instagram" />
                  </Link>
                  <Link to="">
                    <i className="fa fa-twitter" />
                  </Link>
                </div>
                <div className="nav-info">
                  <p>
                    For all orders made, the standard delivery timeline is
                    between
                    <br />
                    24-72 hrs.
                  </p>
                </div>
                <div className="nav-links">
                  <Link to="/">
                    <i className="fa fa-home" />
                  </Link>
                  {auth?.isAuthenticated && localStorage.getItem("token") ? (
                    <>
                      <Link to="/account">
                        <i className="fa fa-user" />
                      </Link>
                      <Link className="nav-cart" to="/order-summary">
                        my cart
                        <i className="fa fa-shopping-bag" />
                        <span>{cartItems?.length ? cartItems?.length : 0}</span>
                      </Link>
                      <Link
                        onClick={() => logOut()}
                        className="nav-login"
                        to="/">
                        logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link className="nav-login" to="/login">
                        login
                        <i className="fa fa-sign-in" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="nav-mid">
                <div className="nav-logo">
                  <Link to="/">
                    <img src={logo} alt="Luxury Silk" />
                  </Link>
                </div>
              </div>{" "}
              <div className="nav-main sticky">
                <ul className="menu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="dropdown">
                    <Link className="dropbtn" to="/collections/all-products">
                      Shop
                      <FiChevronDown />
                    </Link>
                    <div class="dropdown-content">
                      <Link to="/collections/shampoo">Shampoo</Link>
                      <Link to="/collections/hair-oil">Hair Oil</Link>
                      <Link to="/collections/moisturizer">Moisturizer</Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/about-us">About us</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.shoppingCart,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchCart, logOut })(Nav);
