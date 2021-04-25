export const localhost = "http://127.0.0.1:8000";
// export const localhost = "http://oluoch.pythonanywhere.com";

const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const loginURL = `${endpoint}/login/`;
export const registerURL = `${endpoint}/register/`;
export const logOutURL = `${endpoint}/logout/`;
export const userURL = `${endpoint}/user/`;
export const userProfileURL = `${endpoint}/user-profile/`;
export const resetPassURL = `${endpoint}/request-reset-password/`;
export const productListURL = `${endpoint}/products/`;
export const countryListURL = `${endpoint}/countries/`;
export const countyListURL = `${endpoint}/counties/`;
export const cityListURL = `${endpoint}/cities/`;
export const searchURL = `${endpoint}/products?search=`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const removeFromCartURL = (code) =>
  `${endpoint}/remove-from-cart/${code}`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const orderItemsDeleteURL = (id) =>
  `${endpoint}/order-items/${id}/delete/`;
export const addressURL = `${endpoint}/address/`;
export const addressListURL = `${endpoint}/address-list/`;
export const orderAddAddressURL = `${endpoint}/order-address/create/`;
export const addAddressURL = `${endpoint}/address/create/`;
export const deleteAddressURL = (id) => `${endpoint}/address/${id}/delete/`;
export const updateAddressURL = (id) => `${endpoint}/address/${id}/update/`;
export const userIdURL = `${endpoint}/user-id/`;
export const shippingAddressURL = `${endpoint}/shipping-address/create/`;
export const messageURL = `${endpoint}/message/`;
export const shippingSummaryURL = `${endpoint}/shipping-address/`;
export const shippingFeeURL = `${endpoint}/shipping-fee/`;
export const subscribeURL = `${endpoint}/subscribe/`;
export const editUserURL = `${endpoint}/edit-user/`;
export const changePasswordURL = `${endpoint}/change-password/`;
export const addressActiveURL = (id) => `${endpoint}/address/${id}/active/`;
