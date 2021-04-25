import { authAxios } from "../../utils";
import {
  addressListURL,
  addAddressURL,
  deleteAddressURL,
} from "../../constant";
import {
  ADD_ADDRESS_LOADING,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,
  FETCH_ADDRESS_LOADING,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_ERROR,
  DELETE_ADDRESS_LOADING,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_ERROR,
} from "../types";

export const fetchAddress = () => (dispatch) => {
  dispatch({
    type: FETCH_ADDRESS_LOADING,
  });
  authAxios
    .get(addressListURL)
    .then((res) => {
      dispatch({
        type: FETCH_ADDRESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_ADDRESS_ERROR,
        payload: err,
      });
    });
};

export const addAddress = (data) => (dispatch) => {
  dispatch({
    type: ADD_ADDRESS_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(addAddressURL);

  authAxios
    .post(addAddressURL, data, config)
    .then((res) => {
      dispatch({
        type: ADD_ADDRESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_ADDRESS_ERROR,
        payload: err,
      });
    });
};

export const deleteAddress = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ADDRESS_LOADING,
  });
  authAxios
    .delete(deleteAddressURL(id))
    .then((res) => {
      dispatch({
        type: DELETE_ADDRESS_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_ADDRESS_ERROR,
        payload: err,
      });
    });
};
