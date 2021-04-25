import React from "react";
import loadImg from "../assets/imgs/loading.gif";

const Loading = () => {
  return (
    <div className="detail-loading">
      <img src={loadImg} alt="loading" />
    </div>
  );
};

export default Loading;
