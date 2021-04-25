import axios from "axios";
import { endpoint, localhost } from "./constant";

export const getDiscountPerc = (price, discount_price) => {
  let perc = Math.floor(100 - (price / discount_price) * 100);
  return perc;
};

export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

export const getImage = (img) => {
  return `${localhost}${img}`;
};

// Token configuration - helper function
export const tokenConfig = (getState) => {
  // Get token
  const token = localStorage.getItem("token");

  // Add config to header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Add token to config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const addItem = (value) => {
  let quantity = value + 1;
  console.log(quantity);
};

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
