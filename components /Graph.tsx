import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Graph = ({ symbol }) => {
  const [stockData, setStockData] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);

  const now = Math.floor(Date.now() / 1000);
  const oneYearAgo = Math.floor(now - 31556926);

  const nowFormatted = moment.unix(now).format("MMM Do YYYY");
  const oneYearAgoFormatted = moment.unix(oneYearAgo).format("MMM Do YYYY");

  const getLabels = () => {
    const labelsArray = [];
    timeStamps.map((time) => {
      const newLabel = moment.unix(time).format("MMM Do YY");
      labelsArray.push(newLabel);
    });
    return labelsArray;
  };

  const myNewLabels = getLabels();

  useEffect(() => {
    axios
      .get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${oneYearAgo}&to=${now}&token=c0o103748v6qah6rrt7g`
      )
      .then((res) => {
        setStockData(res.data.c);
        setTimeStamps(res.data.t);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [symbol]);

  const data = {
    labels: myNewLabels,
    datasets: [
      {
        label: `${symbol}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#007cad",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#007cad",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#f5e642",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: stockData,
      },
    ],
  };

  return (
    <div>
      <h2>
        Daily Closing Price: {oneYearAgoFormatted} to {nowFormatted}
      </h2>
      <Line data={data} width={300} height={200} />
    </div>
  );
};

export default Graph;
