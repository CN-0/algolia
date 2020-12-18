import React,{useEffect} from "react";
import LoginForm from './views/LoginForm';
import RegistrationForm from './views/RegistrationForm';
import Home from './views/Home';
import * as actions from './store/actions/index'
import {Route, Switch,Redirect} from "react-router-dom"
import { connect } from 'react-redux'
import AlertComponent from './components/AlertComponent'; 

function App(props) {

  useEffect(() => {
    props.onTryAutoSignup()
    // eslint-disable-next-line
  },[])


  let routes = (
    <Switch>
      <Route path="/register" component={RegistrationForm } />
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
    <div className="App">
      {routes}
      <AlertComponent/>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App)
