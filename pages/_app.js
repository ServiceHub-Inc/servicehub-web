import "../styles/globals.css";
import React from "react";
import AppProvider from "../components/Application/AppProvider";
import PropTypes from "prop-types";
import ScrollToTop from "../components/utils/ScrollToTop";
import LoadingProvider from "../components/Application/LoadingProvider";
import { LoginProvider } from "../lib/contexts/LoginContext";
import UsersContextProvider from "../lib/contexts/UserContext";

const App = ({ Component, pageProps }) => {
  return (
    <LoginProvider>
      <LoadingProvider>
        <UsersContextProvider>
          <AppProvider>
            <ScrollToTop />
            <Component {...pageProps} />
          </AppProvider>
        </UsersContextProvider>
      </LoadingProvider>
    </LoginProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
