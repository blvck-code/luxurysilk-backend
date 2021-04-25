import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_DETAIL_LOADING,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_ERROR,
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  REMOVE_FROM_CART_LOADING,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_ERROR,
  GET_ERRORS,
} from "../types";
import axios from "axios";
import { createMessage } from "./messages";
import {
  productListURL,
  endpoint,
  addToCartURL,
  removeFromCartURL,
  searchURL,
  orderItemsDeleteURL,
  messageURL,
} from "../../constant";
import { authAxios, config } from "../../utils";
import { fetchCart } from "./cart";

export const getItems = () => (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_LOADING,
  });
  axios
    .get(productListURL)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: err,
      });
    });
};

export const filterCategory = (category) => (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_LOADING,
  });
  axios
    .get(productListURL)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: err,
      });
    });
};

export const searchItems = (item) => (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_LOADING,
  });
  axios
    .get(`${searchURL}${item}`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: err,
      });
    });
};

export const getItemDetail = (slug) => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_DETAIL_LOADING,
  });

  axios
    .get(`${endpoint}${slug}`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCT_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCT_DETAIL_ERROR,
        payload: err,
      });
    });
};

export const handleAddToCart = (ref_code, qty) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART_LOADING,
  });
  console.log(ref_code);
  console.log(qty);

  const body = JSON.stringify({
    ref_code,
    qty,
  });

  authAxios
    .post(addToCartURL, body, config)
    .then((res) => {
      dispatch(createMessage({ addToCart: res.data }));
      fetchCart();
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_TO_CART_ERROR,
        payload: err,
      });
    });
};

export const handleRemoveFromCart = (code) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART_LOADING,
  });
  authAxios
    .post(`${removeFromCartURL}${code}/`)
    .then((res) => {
      dispatch({
        type: REMOVE_FROM_CART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_FROM_CART_ERROR,
        payload: err,
      });
    });
};

export const handleRemoveItem = (id) => (dispatch) => {
  // dispatch({
  //   type: REMOVE_FROM_CART_LOADING,
  // });
  authAxios
    .delete(orderItemsDeleteURL(id))
    .then((res) => {
      fetchCart();
      // dispatch({
      //   type: REMOVE_FROM_CART_SUCCESS,
      //   payload: id,
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendMsg = (data) => (dispatch) => {
  axios
    .post(messageURL, data, config)
    .then((res) => {
      dispatch(
        createMessage({ saveMsg: "Your message was received successfully" })
      );
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};
