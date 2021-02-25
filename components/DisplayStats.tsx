import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyDetails,
  fetchPeers,
  fetchStockInfo,
  setSymbol,
} from "../state/actions";
import styles from "./DisplayStats.module.css";

const DisplayStats = () => {
  const dispatch = useDispatch();
  const companyProfile = useSelector((state) => state.companyDetails);
  const quote = useSelector((state) => state.quote.quote);
  const peers = useSelector((state) => state.peers.peers);
  const currentSymbol = useSelector((state) => state.symbol.currentSymbol);

  const onClick = (e, symbol) => {
    e.preventDefault();
    dispatch(setSymbol(symbol));
    dispatch(fetchCompanyDetails(symbol));
    dispatch(fetchStockInfo(symbol));
    dispatch(fetchPeers(symbol));
  };

  return (
    <div className={styles.container}>
      {currentSymbol && (
        <>
          <div className={styles.header}>
            <h3>{companyProfile.ticker}</h3>
            <h2>{companyProfile.name}.</h2>
            <p>{quote.c}</p>
          </div>
          <div className={styles.body}>
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
          <div className={styles.peersContainer}>
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
    </div>
  );
};

export default DisplayStats;
