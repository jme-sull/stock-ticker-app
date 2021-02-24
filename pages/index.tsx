import { NextPage } from "next";
import DisplayStats from "../components /DisplayStats";
import Graph from "../components /Graph";
import Input from "../components /Input";
import Layout from "../components /Layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Input />
      <DisplayStats />
      <Graph />
    </Layout>
  );
};

export default HomePage;
