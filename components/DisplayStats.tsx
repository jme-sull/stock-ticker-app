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
  const [peerError, setPeerError] = useState(false);
  const [quoteError, setQuoteError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

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
    setPeerError(false);
    setQuoteError(false);
    setDetailsError(false);
  }, [currentSymbol]);

  useEffect(() => {
    if (companyDetailsFetchError || quoteFetchError || peerFetchError) {
      setShowServerError(true);
      if (peerFetchError) {
        setPeerError(true);
        setServerError(peerFetchError);
      }
      if (quoteFetchError) {
        setQuoteError(true);
        console.log(quoteFetchError);
        setServerError(quoteFetchError);
      }
      if (companyDetailsFetchError) {
        setDetailsError(true);
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
          <div className={styles.header}>
            {detailsError ? (
              <div style={{ color: "red" }}>Error Fetching Company Details</div>
            ) : (
              <>
                <h3>{companyProfile.ticker}</h3>
                <h2>{companyProfile.name}.</h2>
              </>
            )}
            {!quoteError && <p>{quote.c}</p>}
          </div>
          <div className={styles.body}>
            {quoteError ? (
              <div style={{ color: "red" }}>Error Fetching Quote</div>
            ) : (
              <>
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
              </>
            )}
          </div>
          <div className={styles.peersContainer}>
            <h3>Similar Companies</h3>
            {peerError ? (
              <div style={{ color: "red" }}>
                Error Fetching Similar Companies
              </div>
            ) : (
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
            )}
          </div>
        </>
      )}
      <Snackbar
        open={showServerError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Display Error: {serverError.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DisplayStats;
