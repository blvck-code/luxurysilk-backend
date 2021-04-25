import React from "react";
import logo from "../assets/imgs/logo.jpg";
import { Link } from "react-router-dom";

const SetPasswordSuccess = () => {
  return (
    <div className="set-password-success">
      <h1>Your password has been changed</h1>
      <p>You can now login again with your new credentials</p>
      <img src={logo} alt="Luxury Silk" />
      <Link to="/">Go to Luxury Silk</Link>
    </div>
  );
};

export default SetPasswordSuccess;
