import React, { useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/action/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = ({ login, auth, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (auth.token !== "undefined" && localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  document.title = "Sign In | Luxury Silk Online";

  return (
    <Container className="login">
      <h3>Luxury Silk</h3>
      <h1>Welcome Back</h1>
      <p className="text-muted">
        Don't miss your next opportunity. Sign in to get high quality products
        for your hair.
      </p>
      <div className="login-content">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <Button loading={loading} disabled={loading} type="submit" fluid>
            Login
          </Button>
        </form>
        <div className="login__footer">
          <p>
            <Link to="/reset-password">Forgot password? </Link>
          </p>
          <p>
            New to <i>Luxury Silk</i>? <Link to="/register">Join now</Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
