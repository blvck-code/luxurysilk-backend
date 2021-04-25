import React, { useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { resetPass } from "../redux/action/auth";

const ResetPass = ({ auth, resetPass, loading }) => {
  const [email, setEmail] = useState("");

  const { goBack } = useHistory();

  if (auth.isAuthenticated && auth.token) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPass(email);
  };

  document.title = "Reset Password | Luxury Silk Online";

  return (
    <div className="reset-password">
      <Container>
        <h1>First, let's find your account</h1>
        <h5>Please enter your email address</h5>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Email address <span>*</span>
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email address"
          />
          <div className="reset__footer">
            <a onClick={() => goBack()}>Cancel</a>
            <Button loading={loading} disabled={loading} type="submit">
              Find Account
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { resetPass })(ResetPass);
