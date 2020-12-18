import Axios from "axios";

import * as actionTypes from "./actionsTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const changeError = (error) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_ERROR, error: error });
  };
};

export const logout = (token) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post(
      "/users/logout",
      { logout: "logout" },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        localStorage.removeItem("algolia");
        dispatch({ type: actionTypes.AUTH_LOGOUT });
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.msg));
      });
  };
};

export const login = (loginData) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post("/users/login", loginData)
      .then((response) => {
        localStorage.setItem("algolia", JSON.stringify(response.data));
        dispatch(authSuccess(response.data.token, response.data.user.username));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.msg));
      });
  };
};

export const register = (registerData) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post("/users/register", registerData)
      .then((response) => {
        localStorage.setItem("algolia", JSON.stringify(response.data));
        dispatch(authSuccess(response.data.token, response.data.user.username));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.msg));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const algolia = localStorage.getItem("algolia");
    if (!algolia) {
      //dispatch(logout());
    } else {
      const alg = JSON.parse(algolia);
      dispatch(authSuccess(alg.token, alg.user.username));
    }
  };
};
