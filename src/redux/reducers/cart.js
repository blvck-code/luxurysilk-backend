import {
  CART_START,
  CART_SUCCESS,
  CART_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REMOVE_FROM_CART_SUCCESS,
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  REMOVE_ITEM_LOADING,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_ERROR,
} from "../types/index";

const initialState = {
  loading: false,
  shoppingCart: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CART_START:
    case REMOVE_ITEM_LOADING:
    case ADD_TO_CART_LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CART_SUCCESS:
      return {
        ...state,
        shoppingCart: payload,
        error: null,
        loading: false,
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        shoppingCart: state?.shoppingCart?.order_items.filter(
          (item) => item?.item_obj?.ref_code !== payload
        ),
      };
    case CART_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        shoppingCart: state.shoppingCart.order_items.filter(
          (item) => item.id !== payload
        ),
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      return {
        loading: false,
        shoppingCart: null,
        error: null,
      };
    default:
      return state;
  }
}

// Todo
// add to cart success
// add to cart error
