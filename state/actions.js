import Axios from "axios";
import {
  createCompanyDetailsUrl,
  createPeersUrl,
  createQuoteUrl,
} from "../utils/url";
import * as types from "./types";

export const fetchCompanyDetails = (symbol) => (dispatch) => {
  dispatch({ type: types.FETCH_COMP_DETAIL_REQUEST });
  const url = createCompanyDetailsUrl(symbol);
  Axios.get(url)
    .then((response) => {
      dispatch({
        type: types.FETCH_COMP_DETAIL_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) =>
      dispatch({
        type: types.FETCH_COMP_DETAIL_FAILURE,
        error,
      })
    );
};

export const fetchStockInfo = (symbol) => (dispatch) => {
  dispatch({ type: types.FETCH_QUOTE_REQUEST });
  const url = createQuoteUrl(symbol);
  Axios.get(url)
    .then((response) => {
      dispatch({
        type: types.FETCH_QUOTE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) =>
      dispatch({
        type: types.FETCH_QUOTE_FAILURE,
        error,
      })
    );
};

export const fetchPeers = (symbol) => (dispatch) => {
  dispatch({ type: types.FETCH_PEERS_REQUEST });
  const url = createPeersUrl(symbol);
  Axios.get(url)
    .then((response) => {
      dispatch({
        type: types.FETCH_PEERS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) =>
      dispatch({
        type: types.FETCH_PEERS_FAILURE,
        error,
      })
    );
};

export const setSymbol = (symbol) => (dispatch) => {
  dispatch({
    type: types.SET_SYMBOL,
    payload: symbol,
  });
};
