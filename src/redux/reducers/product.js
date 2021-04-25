import {
  GET_PRODUCT_DETAIL_ERROR,
  GET_PRODUCT_DETAIL_LOADING,
  GET_PRODUCT_DETAIL_SUCCESS,
} from "../types";

const initialState = {
  loading: false,
  item: {},
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCT_DETAIL_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        item: payload,
      };
    case GET_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
