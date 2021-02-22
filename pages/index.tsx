import { Grid } from "@material-ui/core";
import { NextPage } from "next";
import Input from "../components /Input";
import Layout from "../components /Layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Input />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>GRAPH GOES HERE</div>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
