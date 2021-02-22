import { Grid } from "@material-ui/core";
import { NextPage } from "next";
import Input from "../components /Input";
import Layout from "../components /Layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Input />
          </Grid>
          {/* <Divider orientation="vertical" flexItem /> */}
          <Grid item xs={12} sm={6}>
            <div>Box #2</div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default HomePage;
