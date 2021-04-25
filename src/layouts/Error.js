import React from "react";
import img from "../assets/imgs/error.jpg";
import { useHistory } from "react-router-dom";

const Error = () => {
  const history = useHistory();
  return (
    <div className="error">
      <div className="error-inner">
        <h1>404</h1>
        <h4>page not found</h4>
        <h2 onClick={() => history.goBack()}>go back</h2>
      </div>
    </div>
  );
};

export default Error;
