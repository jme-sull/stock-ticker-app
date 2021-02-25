import { NextPage } from "next";
import DisplayStats from "../components/DisplayStats";
import Graph from "../components/Graph";
import Input from "../components/Input";
import Layout from "../components/Layout";
import styles from "../styles/index.module.css";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.flexItem}>
          <Input />
          <DisplayStats />
        </div>
        <div className={styles.divider}></div>
        <div className={styles.flexItem}>
          <Graph />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
