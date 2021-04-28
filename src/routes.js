import React, { useEffect } from "react";
import Products from "./layouts/Products";
import ProductDetail from "./layouts/ProductDetail";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./mobile.css";
import "./imports.css";
import Nav from "./component/Nav/Nav";
import Home from "./layouts/Home";
import OrderSummary from "./layouts/OrderSummary";
import Checkout from "./layouts/Checkout";
import Cart from "./component/cart/Cart";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import { getUser, fetchProfile } from "./redux/action/auth";
import { fetchCart } from "./redux/action/cart";
import { getItems } from "./redux/action/products";
import { fetchAddress } from "./redux/action/address";
import { connect } from "react-redux";
import PrivateRouter from "./auth/PrivateRouter";
import ResetPass from "./layouts/ResetPass";
import "./assets/css/font-awesome/css/font-awesome.min.css";
import Account from "./layouts/Account";
import { useLocation } from "react-use";
import Footer from "./component/Footer/Footer";
import ScrollToTop from "./component/ScrollToTop";
import Error from "./layouts/Error";
import QuickView from "./modals/QuickView/QuickView";
import About from "./layouts/About";
import Contact from "./layouts/Contact";
import Shampoo from "./layouts/Shampoo";
import HairOil from "./layouts/HairOil";
import Moisturizer from "./layouts/Moisturizer";
import Alert from "./component/Alerts/Alerts";
import Payment from "./layouts/Payment";
import Shipping from "./layouts/Shipping";
import ActivateUser from "./layouts/ActivateUser";
import SetPassword from "./layouts/SetPassword";
import SetPasswordSuccess from "./layouts/SetPasswordSuccess";

function App({ fetchProfile, getUser, fetchCart, getItems, fetchAddress }) {
  useEffect(() => {
    getUser();
    getItems();
    fetchProfile();
    fetchCart();
    fetchAddress();
  }, []);

  const location = useLocation();

  return (
    <React.Fragment>
      <Router>
        <Nav />
        <QuickView />
        <ScrollToTop />
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset-password" component={ResetPass} />
          <Route exact path="/set-password" component={SetPassword} />
          <Route
            exact
            path="/set-password-success"
            component={SetPasswordSuccess}
          />
          <Route exact path="/collections/shampoo" component={Shampoo} />
          <Route
            exact
            path="/collections/moisturizer"
            component={Moisturizer}
          />
          <Route exact path="/collections/hair-oil" component={HairOil} />
          <Route exact path="/collections/all-products" component={Products} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/contact-us" component={Contact} />
          <Route
            exact
            path="/collections/:category/:slug"
            component={ProductDetail}
          />
          <Route exact path="/api/activate/:id/:key" component={ActivateUser} />

          {/* http://http://localhost:3000/api/activate/NA/allnf4-ae2a6796de251d3f07230af230245ba5/ */}

          <PrivateRouter exact path="/account" component={Account} />
          <PrivateRouter exact path="/order-summary" component={OrderSummary} />
          <PrivateRouter exact path="/checkout" component={Checkout} />
          <PrivateRouter exact path="/shipping" component={Shipping} />
          <PrivateRouter exact path="/payment" component={Payment} />
          <Route component={Error} />
        </Switch>
        {location.pathname !== "/login" &&
          location.pathname !== "/reset-password" &&
          location.pathname !== "/register" && <Footer />}
      </Router>
    </React.Fragment>
  );
}

export default connect(null, {
  getUser,
  fetchProfile,
  fetchCart,
  getItems,
  fetchAddress,
})(App);
