import Axios from "axios";

import * as actionTypes from "./actionsTypes";

export const reqStart = () => {
  return {
    type: actionTypes.REQ_START,
  };
};

export const reqSuccess = (list_type, list) => {
  return {
    type: actionTypes.REQ_SUCCESS,
    list_type: list_type,
    list: list,
  };
};

export const reqFail = (error) => {
  return {
    type: actionTypes.REQ_FAIL,
    error: error,
  };
};

export const getFromApi = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(reqStart());
    Axios.get(
      `https://hn.algolia.com/api/v1/${data.sort}?query=${data.query}&page=${data.page}&tags=${data.type}&numericFilters=${data.dateRange}`
    )
      .then((response) => {
        console.log(response.data);
        if (data.type === "story") {
          dispatch(reqSuccess("stories", response.data));
        } else {
          dispatch(reqSuccess("comments", response.data));
        }
      })
      .catch((err) => {
        dispatch(reqFail("the api is unavailable!"));
      });
  };
};
