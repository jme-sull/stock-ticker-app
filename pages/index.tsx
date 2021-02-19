import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import Layout from "../components /Layout";

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
});

const HomePage: NextPage = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <h2>Box #1</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h2>Box #2</h2>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default HomePage;
