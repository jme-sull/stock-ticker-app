import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import { useState } from "react";
import Layout from "../components /Layout";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  item: {
    height: "100vh",
    padding: 10,
  },
});

const HomePage: NextPage = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <div className={classes.item}>
              Enter Ticker Symbol
              <form>
                <TextField
                  error={error}
                  defaultValue="TICKER"
                  helperText={errorText}
                  variant="outlined"
                />
              </form>
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
