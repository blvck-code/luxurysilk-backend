import {
  SAVE_ADDRESS_SUCCESS,
  SAVE_ADDRESS_ERROR,
  FETCH_ADDRESS_LOADING,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_ERROR,
  ADD_ADDRESS_LOADING,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,
  LOGOUT_SUCCESS,
  DELETE_ADDRESS_LOADING,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_ERROR,
} from "../types";

const initialState = {
  loading: false,
  success: false,
  address: [],
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ADDRESS_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case FETCH_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: payload,
        success: false,
      };
    case FETCH_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case ADD_ADDRESS_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: [payload, ...state.address],
        success: true,
      };
    case ADD_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case DELETE_ADDRESS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: state.address.filter((address) => address.id !== payload),
      };
    case DELETE_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        success: false,
        address: [],
        error: null,
      };
    default:
      return state;
  }
}
