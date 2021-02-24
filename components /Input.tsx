import {
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCompanyDetails, fetchStockInfo } from "../state/actions";
import DisplayStats from "./DisplayStats";
import Graph from "./Graph";

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
  const [peers, setPeers] = useState([]);
  const [fetchedPeers, setFetchedPeers] = useState(false);
  const [allStocks, setAllStocks] = useState([{}]);
  const [input, setInput] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [showGraph, setShowGraph] = useState(false);

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
    //reset
    setFetchedPeers(false);
    setPeers([]);
    //
    const matchSymbol = allStocks.filter((stock) => {
      return stock.symbol == symbol;
    });

    if (!matchSymbol.length) {
      setErrorText("Invalid Symbol");
      setError(true);
    } else {
      setCurrentSymbol(symbol);
      setErrorText("");
      setError(false);
      dispatch(fetchCompanyDetails(symbol));
      dispatch(fetchStockInfo(symbol));
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

      setShowGraph(true);
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div style={{ padding: "3%" }}>
      <Grid
        direction="row"
        justify="space-around"
        className={classes.root}
        container
        spacing={0}
      >
        <Grid className={classes.item} item sm={6} xs={12}>
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
              {fetchedPeers && (
                <DisplayStats
                  peers={peers}
                  onSubmit={onSubmit}
                  setInput={setInput}
                />
              )}
            </div>
          )}
        </Grid>

        {showGraph && (
          <Grid item sm={6} xs={12} className={classes.item}>
            <Graph symbol={currentSymbol} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Input;
