import React, { useState, useEffect } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

function AlertComponent(props) {
  const [modalDisplay, toggleDisplay] = useState("none");
  const openModal = () => {
    toggleDisplay("block");
  };
  const closeModal = () => {
    toggleDisplay("none");
    props.changeError(null);
  };
  useEffect(() => {
    if (props.error !== null) {
      openModal();
    } else {
      closeModal();
    }
  });

  return (
    <div
      className={"alert alert-danger alert-dismissable mt-4"}
      role="alert"
      id="alertPopUp"
      style={{ display: modalDisplay }}
    >
      <div className="d-flex" style={{ width: 250 }}>
        <span className="mr-auto">{props.error}</span>
        <button
          type="button"
          className="close ml-2"
          aria-label="Close"
          onClick={() => closeModal()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeError: (error) => dispatch(actions.changeError(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent);
