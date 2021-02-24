import { useSelector } from "react-redux";
import styles from "./DisplayStats.module.css";

const DisplayStats = ({ setInput, onSubmit }) => {
  const companyProfile = useSelector((state) => state.companyDetails);
  const quote = useSelector((state) => state.quote.quote);
  const peers = useSelector((state) => state.peers.peers);

  return (
    <div className={styles.container}>
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
                onClick={(e) => {
                  setInput(item);
                  onSubmit(e, item);
                }}
                className={styles.peersItem}
                key={index}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayStats;
