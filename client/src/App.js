import React, { useEffect, Suspense, lazy } from "react";
import * as actions from "./store/actions/index";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AlertComponent from "./components/AlertComponent";

const Home = lazy(() => import("./views/Home"));
const LoginForm = lazy(() => import("./views/LoginForm"));
const RegistrationForm = lazy(() => import("./views/RegistrationForm"));

function App(props) {
  useEffect(() => {
    props.onTryAutoSignup();
    // eslint-disable-next-line
  }, []);

  let routes = (
    <Switch>
      <Route path="/register" component={RegistrationForm} />
      <Route path="/" exact component={LoginForm} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        {routes}
        <AlertComponent />
      </div>
    </Suspense>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
