import { GET_MESSAGES, CREATE_MESSAGE } from "../types";

const initialState = {
  msg: "",
  status: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_MESSAGES:
      return payload;
    case CREATE_MESSAGE:
      return (state = payload);
    default:
      return state;
  }
}
