import React, { useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/action/auth";
import Alerts from "../component/Alerts/Alerts";

const Register = ({ auth, register, loading }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [mstStatus, setMstStatus] = useState(null);

  if (auth.isAuthenticated && auth.token) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, username, password);
  };

  document.title = "Register Now | Luxury Silk Online";

  return (
    <>
      {mstStatus && (
        <div className={mstStatus == 200 ? "alert success" : "alert error"}>
          <p>{msg}</p>
        </div>
      )}
      <div className="register">
        <Container className="login">
          <h3>Luxury Silk</h3>
          <h2>Get the best and high quality products for your hair</h2>
          <div className="login-content">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">
                  Password (6 or more characters)
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-muted">
                <small>
                  By clicking Agree & Join, you agree to Luxury Silk{" "}
                  <Link to="/">User Agreement</Link>,{" "}
                  <Link to="/">Privacy Policy</Link>, and{" "}
                  <Link to="/">Cookie Policy</Link>.
                </small>
              </p>
              <Button
                loading={loading}
                disabled={loading}
                type="submit"
                fluid
                primary>
                Agree & Join
              </Button>
            </form>
            <p>
              Already have an account ? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { register })(Register);
