import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyDetails,
  fetchPeers,
  fetchStockInfo,
  setSymbol,
} from "../state/actions";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  item: {
    height: "100vh",
  },
  formItem: {
    width: "70%",
  },
  icon: {
    backgroundColor: "#d7d7d8",
    color: "#878787",
    height: "100%",
    borderRadius: 10,
    borderColor: "#969696",
    cursor: "pointer",
    fontSize: 50,
    align: "center",
    marginLeft: "10px",
    marginTop: "2px",
  },
});

const Input = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [fetchingAllSymbols, setFetchingAllSymbols] = useState(true);
  const [allStocks, setAllStocks] = useState([{}]);
  const [input, setInput] = useState("");
  const currentSymbol = useSelector((state) => state.symbol.currentSymbol);

  useEffect(() => {
    if (currentSymbol) {
      setError(false);
      setErrorText("");
      setInput(currentSymbol);
    }
  }, [currentSymbol]);

  useEffect(() => {
    axios
      .get(
        "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c0o103748v6qah6rrt7g"
      )
      .then((res) => {
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
    const matchSymbol = allStocks.filter((stock) => {
      return stock.symbol == symbol;
    });

    if (!matchSymbol.length) {
      setErrorText("Invalid Symbol");
      setError(true);
    } else {
      setErrorText("");
      setError(false);
      dispatch(setSymbol(symbol));
      dispatch(fetchCompanyDetails(symbol));
      dispatch(fetchStockInfo(symbol));
      dispatch(fetchPeers(symbol));
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
        </div>
      )}
    </>
  );
};

export default Input;
