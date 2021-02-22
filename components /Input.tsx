import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  item: {
    height: "100vh",
    padding: 10,
  },
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
  },
});

const Input = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [stockInfo, setStockInfo] = useState({});
  const [fetchedStockInfo, setFetchedStockInfo] = useState(false);
  const [fetchingAllSymbols, setFetchingAllSymbols] = useState(true);
  const [allStocks, setAllStocks] = useState([{}]);
  const [companyProfile, setCompanyProfile] = useState({});
  const [fetchedProfile, setFetchedProfile] = useState(false);
  const [symbol, setSymbol] = useState("");

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

  const onSubmit = (e) => {
    e.preventDefault();
    setStockInfo({});
    setCompanyProfile({});
    const matchSymbol = allStocks.filter((stock) => {
      return stock.symbol == symbol;
    });

    console.log(matchSymbol);

    if (!matchSymbol.length) {
      setErrorText("Invalid Symbol");
      setError(true);
    } else {
      setErrorText("");
      setError(false);
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
    }
  };

  const onChange = (e) => {
    setSymbol(e.target.value);
  };

  return (
    <>
      {fetchingAllSymbols ? (
        <CircularProgress />
      ) : (
        <div>
          <h1 style={{ fontSize: "18px" }}>Enter Ticker Symbol</h1>
          <TextField
            className={classes.formItem}
            error={error}
            name="symbol"
            onChange={onChange}
            label="TICKER"
            helperText={errorText}
            variant="outlined"
          />
          <ArrowForwardOutlinedIcon
            className={classes.icon}
            onClick={onSubmit}
          />
          {fetchedStockInfo && fetchedProfile && (
            <div>
              <div>{companyProfile.name}</div>
              <div>{stockInfo.h}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
