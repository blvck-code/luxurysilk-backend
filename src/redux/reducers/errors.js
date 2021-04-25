import { GET_ERRORS, LOGIN_SUCCESS } from "../types";

const initialState = {
  msg: {},
  status: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ERRORS:
      return {
        msg: payload.msg,
        status: payload.status,
      };
    case LOGIN_SUCCESS:
      return {
        msg: {},
        status: null,
      };
    default:
      return state;
  }
}
