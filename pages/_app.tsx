import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import { useStore } from "../state/store";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>NDVR App Challenge</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
