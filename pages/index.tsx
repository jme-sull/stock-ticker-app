import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import Graph from "../components /Graph";
import Input from "../components /Input";
import Layout from "../components /Layout";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  item: {
    height: "100vh",
  },
});

const HomePage: NextPage = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div style={{ padding: "3%" }}>
        <Grid className={classes.root} container spacing={0}>
          <Grid className={classes.item} item xs={12} sm={6}>
            <Input />
          </Grid>
          <Grid className={classes.item} item xs={12} sm={6}>
            <Graph label={"Apple"} />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default HomePage;
