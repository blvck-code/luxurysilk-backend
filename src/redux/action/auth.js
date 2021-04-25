import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  RESET_PASS_LOADING,
  RESET_PASS_SUCCESS,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_ERRORS,
  FETCH_PROFILE_LOADING,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
  CHANGE_PASS_LOADING,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_ERROR,
} from "../types";
import {
  loginURL,
  userURL,
  resetPassURL,
  logOutURL,
  registerURL,
  subscribeURL,
  userProfileURL,
  changePasswordURL,
} from "../../constant";
import { authAxios, tokenConfig } from "../../utils";
import { createMessage } from "./messages";
import { config } from "../../utils";

// Subscribe
export const subscribe = (email) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(subscribeURL, email, config)
    .then((res) => {
      dispatch(
        createMessage({
          subscribeMsg: "You've successfully subscribed to our Newsletter",
        })
      );
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// LOG IN
export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  axios
    .post(loginURL, body, config)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err?.response.data,
        status: err?.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
      dispatch({
        type: LOGIN_ERROR,
      });
    });
};

// REGISTER
export const register = (email, username, password) => (dispatch) => {
  dispatch({ type: REGISTER_LOADING });

  const body = JSON.stringify({ email, username, password });
  axios
    .post(registerURL, body, config)
    .then((res) => {
      dispatch(
        createMessage({
          registerMsg: `We've sent an email to ${email}. Open it up to activate your account.`,
        })
      );
      dispatch({
        type: REGISTER_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(
        createMessage({
          registerError: err.error,
        })
      );
      dispatch({
        type: REGISTER_ERROR,
      });
    });
};

// Get User
export const getUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(userURL, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Logout User
export const logOut = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: LOGOUT_LOADING });

  axios
    .post(logOutURL, null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_ERROR,
      });
    });
};

// Reset Password
export const resetPass = (email) => (dispatch) => {
  dispatch({ type: RESET_PASS_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  axios
    .post(resetPassURL, body, config)
    .then((res) => {
      dispatch({ type: RESET_PASS_SUCCESS });
      dispatch(
        createMessage({
          resetMsg: "We have sent you a link to reset your password.",
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

// User Profile
export const fetchProfile = () => (dispatch) => {
  dispatch({
    type: FETCH_PROFILE_LOADING,
  });
  authAxios
    .get(userProfileURL)
    .then((res) => {
      dispatch({
        type: FETCH_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_PROFILE_ERROR,
        payload: err,
      });
    });
};

// REGISTER
// export const register = ({
//   email,
//   first_name,
//   last_name,
//   password,
//   password2,
// }) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({
//     email,
//     first_name,
//     last_name,
//     password,
//     password2,
//   });

//   axios
//     .post(`${baseUrl}/api/auth/register`, body, config)
//     .then((res) => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: REGISTER_ERROR,
//       });
//     });
// };

// LOG OUT
// export const logout = () => (dispatch, getState) => {
//   axios
//     .post(`${baseUrl}/api/auth/logout`, null, tokenConfig(getState))
//     .then((res) => {
//       dispatch({
//         type: LOGOUT_SUCCESS,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: AUTH_ERROR,
//       });
//     });
// };

// VALIDATE EMAIL
// export const validateEmail = (email) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ email });

//   axios
//     .post(`${baseUrl}/api/auth/validate-email`, body, config)
//     .then((res) => {
//       dispatch({
//         type: VALIDATE_EMAIL,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log("ERROR", err));
// };

// VALIDATE FIRSTNAME
// export const validateFirstname = (first_name) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ first_name });

//   axios
//     .post(`${baseUrl}/api/auth/validate-firstname`, body, config)
//     .then((res) => {
//       dispatch({
//         type: VALIDATE_FIRSTNAME,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log("ERROR", err));
// };

// // VALIDATE LASTNAME
// export const validateLastname = (last_name) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ last_name });

//   axios
//     .post(`${baseUrl}/api/auth/validate-lastname`, body, config)
//     .then((res) => {
//       dispatch({
//         type: VALIDATE_LASTNAME,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log("ERROR", err));
// };

// // VALIDATE PASSWORD
// export const validatePassword = (password) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ password });

//   axios
//     .post(`${baseUrl}/api/auth/validate-password`, body, config)
//     .then((res) => {
//       dispatch({
//         type: VALIDATE_PASSWORD,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log("ERROR", err));
// };

// // VALIDATE PASSWORD
// export const confirmPassword = (password, password2) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ password, password2 });

//   axios
//     .post(`${baseUrl}/api/auth/confirm-password`, body, config)
//     .then((res) => {
//       console.log(res.data);

//       dispatch({
//         type: CONFIRM_PASSWORD,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log("ERROR", err));
// };

// // Helper function
// export const tokenConfig = (getState) => {
//   // Get token
//   const token = getState().auth.token;

//   // Add
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Add token to config
//   if (token) {
//     config.headers["Authorization"] = `Token ${token}`;
//   }

//   return config;
// };
