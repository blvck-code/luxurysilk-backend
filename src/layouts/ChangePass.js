import React, { useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { changePasswordURL } from "../constant";
import { authAxios, config } from "../utils";

const ChangePass = () => {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass1, setShowNewPass1] = useState(false);
  const [showNewPass2, setShowNewPass2] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChangePass = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      old_password: oldPassword,
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
    <form onSubmit={(e) => handleChangePass(e)} className="change-password">
      <div className="input-group">
        <label htmlFor="current-pass">Current Password</label>
        <div className="password-input">
          <input
            type={showCurrentPass ? "text" : "password"}
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <i
            className={showCurrentPass ? "fa fa-eye-slash" : "fa fa-eye"}
            onClick={() => setShowCurrentPass(!showCurrentPass)}
          />
        </div>
      </div>
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
      {success && (
        <Message
          success
          header="Success"
          content="Successfully changed password"
        />
      )}

      {error && <Message warning header="Error" content="Wrong password." />}

      <Button disabled={loading} loading={loading} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ChangePass;
