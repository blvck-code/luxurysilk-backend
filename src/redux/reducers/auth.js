import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  RESET_PASS_LOADING,
  RESET_PASS_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  USER_LOADING,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  FETCH_PROFILE_LOADING,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  profile: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case RESET_PASS_LOADING:
    case REGISTER_LOADING:
    case USER_LOADING:
    case LOGIN_LOADING:
    case LOGOUT_LOADING:
    case FETCH_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        user: payload,
        isAuthenticated: true,
      };
    case LOGIN_ERROR:
    case FETCH_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        profile: null,
        isAuthenticated: false,
        error: payload,
      };
    case RESET_PASS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
