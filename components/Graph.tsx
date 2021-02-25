import { Snackbar } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { createGraphDataUrl } from "../utils/url";
import Alert from "./Alert";

const Graph = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState({ message: "" });
  const [stockData, setStockData] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);

  const symbol = useSelector((state) => state.symbol.currentSymbol);

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

  const graphLabels = getLabels();

  const handleClose = (e) => {
    setShowAlert(false);
  };

  useEffect(() => {
    //reset errors if symbol changes
    setServerError(false);
  }, [symbol]);

  useEffect(() => {
    if (symbol) {
      const url = createGraphDataUrl(symbol, oneYearAgo, now);
      axios
        .get(url)
        .then((res) => {
          setStockData(res.data.c);
          setTimeStamps(res.data.t);
        })
        .catch((err) => {
          setServerError(true);
          setServerErrorMessage(err);
          setShowAlert(true);
        });
    }
  }, [symbol]);

  const data = {
    labels: graphLabels,
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
    <>
      {symbol && (
        <>
          <h2>
            Daily Closing Price: {oneYearAgoFormatted} to {nowFormatted}
          </h2>
          {!serverError && <Line data={data} width={300} height={200} />}

          <Snackbar
            open={showAlert}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Graph Error: {serverErrorMessage.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default Graph;
