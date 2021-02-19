import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForward";
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
  const [stock, setStock] = useState({});
  const [fetchedStock, setFetchedStock] = useState(false);
  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <div className={classes.item}>
              <h1 style={{ fontSize: "18px" }}>Enter Ticker Symbol</h1>
              <form>
                <TextField
                  className={classes.formItem}
                  error={error}
                  label="TICKER"
                  helperText={errorText}
                  variant="outlined"
                />
                <ArrowForwardOutlinedIcon className={classes.icon} />
              </form>
              {fetchedStock && <div>THIS SHOULD BE INVISABLE</div>}
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
