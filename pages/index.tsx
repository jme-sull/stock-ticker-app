import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import Input from "../components /Input";
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
});

const HomePage: NextPage = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Grid className={classes.root} container spacing={3}>
        <Grid className={classes.item} item xs={12} sm={6}>
          <Input />
        </Grid>
        <Grid className={classes.item} item xs={12} sm={6}>
          <div>GRAPH GOES HERE</div>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
