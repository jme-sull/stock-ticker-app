import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import Layout from "../components /Layout";

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

const HomePage: NextPage = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [stockInfo, setStockInfo] = useState({});
  const [companyDetails, setCompanyDetails] = useState({});
  const [symbol, setSymbol] = useState("");
  const [fetchedStock, setFetchedStock] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=c0o103748v6qah6rrt7g`
      )
      .then((res) => {
        console.log(res);
        setCompanyDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c0o103748v6qah6rrt7g`
      )
      .then((res) => {
        console.log(res);
        setStockInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setFetchedStock(true);
  };
  const onChange = (e) => {
    setSymbol(e.target.value);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <div className={classes.item}>
              <h1 style={{ fontSize: "18px" }}>Enter Ticker Symbol</h1>
              <form onSubmit={onSubmit}>
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
                  onClick={onSubmit}
                  className={classes.icon}
                />
              </form>
              {fetchedStock && (
                <div>
                  <div>{companyDetails.name}</div>
                  <div>{stockInfo.h}</div>
                </div>
              )}
            </div>
          </Grid>
          {/* <Divider orientation="vertical" flexItem /> */}
          <Grid item xs={12} sm={6}>
            <div className={classes.item}>Box #2</div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default HomePage;
