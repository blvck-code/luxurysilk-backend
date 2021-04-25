import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTimeout } from "react-use";
import "./style.css";

const Alerts = ({ error, status, messages }) => {
  const [msg, setMsg] = useState("");
  const [mstStatus, setMstStatus] = useState(null);

  useEffect(() => {
    if (error) {
      if (error.message) {
        setMsg(error.message);
        setMstStatus(status);
        setTimeout(() => {
          document.querySelector(".alert").classList.add("showItem");
        }, 0);
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("showItem");
        }, 4000);
      }
      if (error.registerError) {
        setMsg(error.registerError);
        setMstStatus(status);
        setTimeout(() => {
          document.querySelector(".alert").classList.add("showItem");
        }, 0);
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("showItem");
        }, 4000);
      }
    }
  }, [error]);

  useEffect(() => {
    if (messages) {
      if (messages.registerMsg) {
        setMsg(messages.registerMsg);
        setMstStatus(200);

        setTimeout(() => {
          document.querySelector(".alert").classList.add("showItem");
        }, 0);
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("showItem");
        }, 4000);
      }
      if (messages.resetMsg) {
        setMsg(messages.resetMsg);
        setMstStatus(200);

        setTimeout(() => {
          document.querySelector(".alert").classList.add("showItem");
        }, 0);
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("showItem");
        }, 4000);
      }
      // if (messages.addToCart) {
      //   setMsg(messages.addToCart);
      //   setMstStatus(200);

      //   setTimeout(() => {
      //     document.querySelector(".alert").classList.add("showItem");
      //   }, 0);
      //   setTimeout(() => {
      //     document.querySelector(".alert").classList.remove("showItem");
      //   }, 4000);
      // }
      if (messages.saveMsg) {
        setMsg(messages.saveMsg);
        setMstStatus(200);

        setTimeout(() => {
          document.querySelector(".alert").classList.add("showItem");
        }, 0);
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("showItem");
        }, 4000);
      }
      if (messages.subscribeMsg) {
        setMsg(messages.subscribeMsg);
        setMstStatus(200);

        setTimeout(() => {
          document.querySelector(".alert").classList.add("showItem");
        }, 0);
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("showItem");
        }, 4000);
      }
    }
  }, [messages]);

  return (
    <>
      {mstStatus && (
        <div className={mstStatus == 200 ? "alert success" : "alert error"}>
          <p>{msg}</p>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  error: state.errors.msg,
  status: state.errors.status,
  messages: state.messages,
});

export default connect(mapStateToProps)(Alerts);
