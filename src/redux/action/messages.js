import { CREATE_MESSAGE } from "../types";

// CREATE MESSAGE
export const createMessage = (msg) => {
  console.log(msg);
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};
