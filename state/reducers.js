import { combineReducers } from "redux";
import * as types from "./types";

const initialCompanyDetailsState = {
  name: "",
  ticker: "",
  loading: false,
  error: null,
};

const companyDetailsReducer = (state = initialCompanyDetailsState, action) => {
  switch (action.type) {
    case types.FETCH_COMP_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_COMP_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        ticker: action.payload.ticker,
      };

    case types.FETCH_COMP_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  companyDetails: companyDetailsReducer,
};

export default combineReducers(reducers);