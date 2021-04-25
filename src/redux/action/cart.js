import { authAxios, tokenConfig } from "../../utils";
import {
  CART_START,
  CART_SUCCESS,
  CART_FAIL,
  REMOVE_ITEM_LOADING,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_ERROR,
} from "../types/index";
import { orderSummaryURL, removeFromCartURL } from "../../constant";

export const fetchCart = () => (dispatch, getState) => {
  dispatch({
    type: CART_START,
  });
  authAxios
    .get(orderSummaryURL, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CART_FAIL,
        payload: err,
      });
    });
};

export const removeFromCart = (code) => (dispatch) => {
  dispatch({
    type: REMOVE_ITEM_LOADING,
  });
  fetchCart();

  authAxios
    .delete(removeFromCartURL(code), null)
    .then((res) => {
      dispatch({
        type: REMOVE_ITEM_SUCCESS,
        payload: code,
      });
      fetchCart();
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_ITEM_ERROR,
        payload: err,
      });
    });
};
