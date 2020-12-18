import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

function RegistrationForm(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      if (state.username.length && state.password.length) {
        props.changeError(null);
        props.register({
          username: state.username,
          password: state.password,
        });
      } else {
        props.changeError("Please enter valid username and password");
      }
    } else {
      props.changeError("Passwords do not match");
    }
  };
  return (
    <div className="card col-12 col-lg-4 login-card p-4">
      <h5 className="text-center">Registration Form</h5>
      <form className="mt-2 mb-3">
        <div className="form-group text-left">
          <label htmlFor="exampleInputUsername1">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter Username"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
      <div className="mb-4">
        <span>Already have an account? </span>
        <span>
          <Link to="/">Login here</Link>
        </span>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeError: (error) => dispatch(actions.changeError(error)),
    register: (data) => dispatch(actions.register(data)),
  };
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
