import { combineReducers } from "redux";
import products from "./products";
import product from "./product";
import cart from "./cart";
import auth from "./auth";
import address from "./address";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  auth,
  products,
  cart,
  product,
  address,
  errors,
  messages,
});
