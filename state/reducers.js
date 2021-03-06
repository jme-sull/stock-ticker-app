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
        error: null,
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

const initalQuoteState = {
  quote: {},
  loading: false,
  error: null,
};

const quoteReducer = (state = initalQuoteState, action) => {
  switch (action.type) {
    case types.FETCH_QUOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_QUOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        quote: action.payload,
      };

    case types.FETCH_QUOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
const initalPeersState = {
  peers: [],
  loading: false,
  error: null,
};

const peersReducer = (state = initalPeersState, action) => {
  switch (action.type) {
    case types.FETCH_PEERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_PEERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        peers: action.payload,
      };

    case types.FETCH_PEERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const initalSymbolState = {
  currentSymbol: null,
};
const symbolReducer = (state = initalSymbolState, action) => {
  switch (action.type) {
    case types.SET_SYMBOL:
      return {
        ...state,
        currentSymbol: action.payload,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  companyDetails: companyDetailsReducer,
  quote: quoteReducer,
  peers: peersReducer,
  symbol: symbolReducer,
};

export default combineReducers(reducers);
