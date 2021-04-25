import React, { useEffect, useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { editUserURL } from "../constant";
import { authAxios, config } from "../utils";
import { fetchProfile } from "../redux/action/auth";

const EditDetails = ({ user, profile, fetchProfile }) => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserName(user?.username);
    setEmail(user?.email);
    setFirstName(profile?.first_name);
    setLastName(profile?.last_name);
    setPhone(profile?.phone_number);
  }, [user, profile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      user_name: userName,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    });
    updateUser(data);
  };

  const updateUser = (data) => {
    setLoading(true);
    authAxios
      .put(editUserURL, data, config)
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setError(null);
        fetchProfile();
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
        setError(err);
      });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="account_inner-content__details">
      <div className="input-group firstname">
        <label htmlFor="firstname">Username</label>
        <input
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
      </div>
      <div className="input-inline">
        <div className="input-group firstname">
          <label htmlFor="firstname">First name</label>
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
        </div>
        <div className="input-group lastname">
          <label htmlFor="lastname">Last name</label>
          <input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="input-inline">
        <div className="input-group firstname">
          <label htmlFor="firstname">Email</label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>
        <div className="input-group lastname">
          <label htmlFor="lastname">Prefix</label>
          <div className="input-group phone">
            <div className="phone_code">+254</div>
            <input
              required
              placeholder="E.g 79000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength="9"
              type="text"
            />
          </div>
        </div>
      </div>

      {success && (
        <Message
          header="Success"
          success
          content="Profile saved successfully"
        />
      )}
      {error && <Message header="Error" warning content={error} />}
      <Button loading={loading} disabled={loading} type="submit">
        save
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.auth.profile,
});

export default connect(mapStateToProps, { fetchProfile })(EditDetails);
