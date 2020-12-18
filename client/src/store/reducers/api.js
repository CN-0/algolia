import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  stories: null,
  comments: null,
  error: null,
  loading: false,
  list_type: null,
};

const reqStart = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const reqSuccess = (state, action) => {
  return updateObject(state, {
    [action.list_type]: action.list,
    list_type: action.list_type,
    error: null,
    loading: false,
  });
};

const reqFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQ_START:
      return reqStart(state);
    case actionTypes.REQ_SUCCESS:
      return reqSuccess(state, action);
    case actionTypes.REQ_FAIL:
      return reqFail(state, action);
    default:
      return state;
  }
};

export default reducer;
