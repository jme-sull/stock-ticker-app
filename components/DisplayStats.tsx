import { Snackbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyDetails,
  fetchPeers,
  fetchQuote,
  setSymbol,
} from "../state/actions";
import styles from "../styles/DisplayStats.module.css";
import Alert from "./Alert";

const DisplayStats = () => {
  const [showServerError, setShowServerError] = useState(false);
  const [serverError, setServerError] = useState({ message: "" });
  const [serverErrorType, setServerErrorType] = useState("");

  const dispatch = useDispatch();
  const companyProfile = useSelector((state) => state.companyDetails);
  const quote = useSelector((state) => state.quote.quote);
  const peers = useSelector((state) => state.peers.peers);
  const currentSymbol = useSelector((state) => state.symbol.currentSymbol);

  const companyDetailsFetchError = useSelector(
    (state) => state.companyDetails.error
  );
  const quoteFetchError = useSelector((state) => state.quote.error);
  const peerFetchError = useSelector((state) => state.peers.error);

  useEffect(() => {
    //reset errors if symbol changes
    setShowServerError(false);
  }, [currentSymbol]);

  useEffect(() => {
    if (companyDetailsFetchError || quoteFetchError || peerFetchError) {
      setShowServerError(true);
      if (peerFetchError) {
        setServerErrorType("Similar Companies Fetch Error");
        setServerError(peerFetchError);
      }
      if (quoteFetchError) {
        setServerErrorType("Quote Fetch Error");
        setServerError(quoteFetchError);
      }
      if (companyDetailsFetchError) {
        setServerErrorType("Company Details Fetch Error");
        setServerError(companyDetailsFetchError);
      }
    }
  }, [companyDetailsFetchError, quoteFetchError, peerFetchError]);

  const onClick = (e, symbol) => {
    e.preventDefault();
    dispatch(setSymbol(symbol));
    dispatch(fetchCompanyDetails(symbol));
    dispatch(fetchQuote(symbol));
    dispatch(fetchPeers(symbol));
  };

  const handleClose = (e) => {
    setShowServerError(false);
  };

  return (
    <div className={styles.container}>
      {currentSymbol && (
        <>
          <div
            style={{ display: companyDetailsFetchError ? "none" : "" }}
            className={styles.header}
          >
            <h3>{companyProfile.ticker}</h3>
            <h2>{companyProfile.name}.</h2>
            <p>{quote.c}</p>
          </div>
          <div
            style={{ display: quoteFetchError ? "none" : "" }}
            className={styles.body}
          >
            <div className={styles.flexHeading}>
              <div>Previous Close: </div>
              <div>Todays Open: </div>
              <div>Todays High: </div>
              <div>Todays Low: </div>
            </div>
            <div className={styles.flexStats}>
              <div>{quote.pc}</div>
              <div>{quote.o}</div>
              <div>{quote.h}</div>
              <div>{quote.l}</div>
            </div>
          </div>
          <div
            style={{ display: peerFetchError ? "none" : "" }}
            className={styles.peersContainer}
          >
            <h3>Similar Companies</h3>
            <div className={styles.peers}>
              {peers.slice(0, 3).map((item, index) => {
                return (
                  <div
                    onClick={(e) => onClick(e, item)}
                    className={styles.peersItem}
                    key={index}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <Snackbar
        open={showServerError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {serverErrorType}: {serverError.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DisplayStats;
