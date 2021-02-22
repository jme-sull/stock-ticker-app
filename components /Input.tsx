import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  formItem: {
    width: "70%",
  },
  icon: {
    backgroundColor: "#d7d7d8",
    color: "#878787",
    height: "100%",
    borderRadius: 3,
    borderColor: "#969696",
    borderWidth: "10px",
    cursor: "pointer",
    fontSize: 45,
    align: "center",
    marginLeft: "10px",
    marginTop: "5px",
  },
});

const Input = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [stockInfo, setStockInfo] = useState({});
  const [fetchedStockInfo, setFetchedStockInfo] = useState(false);
  const [fetchingAllSymbols, setFetchingAllSymbols] = useState(true);
  const [fetchingStock, setFetchingStock] = useState(false);
  const [peers, setPeers] = useState([]);
  const [fetchedPeers, setFetchedPeers] = useState(false);
  const [allStocks, setAllStocks] = useState([{}]);
  const [companyProfile, setCompanyProfile] = useState({});
  const [fetchedProfile, setFetchedProfile] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c0o103748v6qah6rrt7g"
      )
      .then((res) => {
        console.log(res);
        setAllStocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetchingAllSymbols(false);
      });
  }, []);

  const onSubmit = (e, symbol) => {
    e.preventDefault();
    //reset
    setFetchingStock(false);
    setFetchedStockInfo(false);
    setFetchedProfile(false);
    setFetchedPeers(false);
    setStockInfo({});
    setCompanyProfile({});
    setPeers([]);
    //
    const matchSymbol = allStocks.filter((stock) => {
      return stock.symbol == symbol;
    });

    if (!matchSymbol.length) {
      setErrorText("Invalid Symbol");
      setError(true);
    } else {
      setErrorText("");
      setError(false);
      setFetchingStock(true);
      console.log(symbol);
      axios
        .get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=c0o103748v6qah6rrt7g`
        )
        .then((res) => {
          console.log(res);
          setCompanyProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setFetchedProfile(true);
        });
      axios
        .get(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c0o103748v6qah6rrt7g`
        )
        .then((res) => {
          setStockInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setFetchedStockInfo(true);
        });
      axios
        .get(
          `https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=c0o103748v6qah6rrt7g`
        )
        .then((res) => {
          setPeers(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setFetchedPeers(true);
        });
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      {fetchingAllSymbols ? (
        <CircularProgress />
      ) : (
        <div>
          <h1 style={{ fontSize: "18px" }}>Enter Ticker Symbol</h1>
          <form onSubmit={(e) => onSubmit(e, input)}>
            <TextField
              className={classes.formItem}
              error={error}
              name="symbol"
              value={input}
              onChange={onChange}
              label="TICKER"
              helperText={errorText}
              variant="outlined"
            />
            <ArrowForwardOutlinedIcon
              className={classes.icon}
              onClick={(e) => onSubmit(e, input)}
            />
          </form>
          {fetchingStock &&
            (!fetchedStockInfo || !fetchedProfile || !fetchedPeers) && (
              <CircularProgress />
            )}
          {fetchedStockInfo && fetchedPeers && fetchedProfile && (
            <div>
              <div>{companyProfile.ticker}</div>
              <div>{companyProfile.name}</div>
              <div>Current Price: {stockInfo.c}</div>
              <div>Previous Close: {stockInfo.pc}</div>
              <div>Todays Open: {stockInfo.o}</div>
              <div>Todays High: {stockInfo.o}</div>
              <div>Todays Low: {stockInfo.o}</div>
              <h3>Similar Companies</h3>
              {peers.slice(0, 3).map((item, index) => {
                return (
                  <div
                    onClick={(e) => {
                      setInput(item);
                      onSubmit(e, item);
                    }}
                    key={index}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
