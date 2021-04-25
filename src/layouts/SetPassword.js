import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { changePasswordURL } from "../constant";
import { authAxios, config } from "../utils";

const SetPassword = () => {
  const [showNewPass1, setShowNewPass1] = useState(false);
  const [showNewPass2, setShowNewPass2] = useState(false);
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChangePass = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      new_password: newPass1,
      confirm_new_password: newPass2,
    });

    changePassword(data);
  };

  const changePassword = (data) => {
    setLoading(true);
    authAxios
      .put(changePasswordURL, data, config)
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
        setError(err);
        console.log(err);
      });
  };

  return (
    <div className="set-password">
      <h1>Choose a new password</h1>
      <p>Create a new password that is at least 8 characters long</p>
      <form onSubmit={(e) => handleChangePass(e)} className="change-password">
        <div className="input-group">
          <label htmlFor="current-pass">New Password</label>
          <div className="password-input">
            <input
              value={newPass1}
              onChange={(e) => setNewPass1(e.target.value)}
              type={showNewPass1 ? "text" : "password"}
              required
            />
            <i
              className={showNewPass1 ? "fa fa-eye-slash" : "fa fa-eye"}
              onClick={() => setShowNewPass1(!showNewPass1)}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="current-pass">Retype New Password</label>
          <div className="password-input">
            <input
              value={newPass2}
              onChange={(e) => setNewPass2(e.target.value)}
              type={showNewPass2 ? "text" : "password"}
              required
            />
            <i
              className={showNewPass2 ? "fa fa-eye-slash" : "fa fa-eye"}
              onClick={() => setShowNewPass2(!showNewPass2)}
            />
          </div>
        </div>
        <Button disabled={loading} loading={loading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SetPassword;
