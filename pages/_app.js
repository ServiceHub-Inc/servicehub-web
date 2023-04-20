import "../styles/globals.css";
import React from "react";
import AppProvider from "../components/Application/AppProvider";
import PropTypes from "prop-types";
import ScrollToTop from "../components/utils/ScrollToTop";
import LoadingProvider from "../components/Application/LoadingProvider";
import { LoginProvider } from "../lib/contexts/LoginContext";
import UsersContextProvider from "../lib/contexts/UserContext";
import AdminsContextProvider from "../lib/contexts/AdminContext";

const App = ({ Component, pageProps }) => {
	return (
		<LoginProvider>
			<LoadingProvider>
				<AdminsContextProvider>
					<UsersContextProvider>
						<AppProvider>
							<ScrollToTop />
							<Component {...pageProps} />
						</AppProvider>
					</UsersContextProvider>
				</AdminsContextProvider>
			</LoadingProvider>
		</LoginProvider>
	);
};

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.shape({}).isRequired,
};

export default App;
