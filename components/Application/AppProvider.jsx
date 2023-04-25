import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
	AppShell,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import { SideNav } from "./Dashboard/Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { LoginContext } from "../../lib/contexts/LoginContext";

const AppProvider = ({ children }) => {
	const { loggedIn } = useContext(LoginContext);

	const showComponents =
		window.location.pathname !== "/auth/login" &&
		window.location.pathname !== "/auth/register";

	const showDashboard = window.location.pathname !== "/" && showComponents;

	const error = {
		fontSize: "12px",
		fontFamily:
			'-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
	};

	const [colorScheme, setColorScheme] = useLocalStorage({
		key: "mantine-color-scheme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});
	// const [colorScheme, setColorScheme] = useState('light');

	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	return (
		<>
			<Head>
				<title>ServiceHub</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					styles={{
						PasswordInput: { error },
						TextInput: { error },
						NumberInput: { error },
						Textarea: { error },
					}}
					// classNames={{
					//   modal: {
					//     modal: "max-w-[min(100vw,720px)] w-full",
					//     title: "text-center w-full",
					//     header:
					//       "bg-primary text-center w-full rounded-md p-2 text-white font-bold",
					//     body: " border border-solid border-gray-200 rounded-md p-6",
					//     close: "text-white hover:text-primary",
					//   },
					// }}
					theme={{
						colors: {
							brand: [
								"#ebfbee",
								"#d3f9d8",
								"#b2f2bb",
								"#8ce99a",
								"#69db7c",
								"#51cf66",
								"#40c057",
								"#37b24d",
								"#2f9e44",
								"#32CD32",
							],
						},
						primaryColor: "brand",
						fontFamily:
							'Roboto,-apple-system , BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
						fontSize: "10px",
						headings: {
							fontFamily:
								'"Roboto SlabVariable", Roboto,-apple-system , BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
						},

						colorScheme,
					}}
				>
					<Notifications autoClose={4000} />
					<ModalsProvider
						modalProps={{
							classNames: {
								modal: "max-w-[min(100vw,720px)] w-full z-[99999]",
								header: "text-center bg-primary m-3",
								title:
									"text-center w-full font-bold text-center w-full rounded-md text-white font-bold",
								body: " border border-solid border-gray-200 rounded-md p-6",
								close: "text-red-700  text-4xl hover:text-red-800",
							},
						}}
					>
						{window.location.pathname === "/" ? (
							<div className="h-screen ">
								<AppShell
									header={<AppHeader />}
									navbar={showDashboard && <SideNav />}
									footer={showComponents && <AppFooter />}
								>
									{children}
								</AppShell>
							</div>
						) : (
							<div className="w-full h-[calc(100%-60px)]">{children}</div>
						)}
					</ModalsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
};

AppProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppProvider;
