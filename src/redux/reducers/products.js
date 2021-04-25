import {
  GET_PRODUCTS,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  CART_START,
  CART_SUCCESS,
  CART_FAIL,
} from "../types";

const initialState = {
  loading: false,
  products: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
        error: null,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CART_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CART_SUCCESS:
      return {
        ...state,
        shoppingCart: payload,
        error: null,
        loading: false,
      };
    case CART_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
