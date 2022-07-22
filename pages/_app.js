import "../styles/globals.css";
import React from "react";
import PropTypes from "prop-types";
import AppProvider from "../components/Application/AppProvider";
import ScrollToTop from "../components/utils/ScrollToTop";
import LoadingProvider from "../components/Application/LoadingProvider";
import { LoginProvider } from "../lib/contexts/LoginContext";

const App = ({ Component, pageProps }) => {
  return (
    <LoginProvider>
      <LoadingProvider>
        <AppProvider>
          <ScrollToTop />
          <Component {...pageProps} />
        </AppProvider>
      </LoadingProvider>
    </LoginProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;

