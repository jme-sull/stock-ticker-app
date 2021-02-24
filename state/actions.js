import Axios from "axios";
import * as types from "./types";

export const fetchCompanyDetails = (symbol) => (dispatch) => {
  dispatch({ type: types.FETCH_COMP_DETAIL_REQUEST });
  Axios.get(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=c0o103748v6qah6rrt7g`
  )
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
  Axios.get(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c0o103748v6qah6rrt7g`
  )
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
