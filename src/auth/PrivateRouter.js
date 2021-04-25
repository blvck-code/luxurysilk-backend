import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <h1>Loading...</h1>;
      } else if (localStorage.getItem("token") === "undefined") {
        return <Redirect to="/login" />;
      } else if (!auth.isAuthenticated && !localStorage.getItem("token")) {
        return <Redirect to="/login" />;
      } else if (localStorage.getItem("token") === "undefined") {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
