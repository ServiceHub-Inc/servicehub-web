import { useState, createContext, useCallback, useEffect } from "react";
// import LogRocket from 'logrocket';
import PropTypes from "prop-types";
import React from "react";
import Cookies from "universal-cookie";
import config from "../config";
// import apiFetcher from '../api/apiFetcher';

export const LoginContext = createContext();

const cookies = new Cookies();
export function LoginProvider({ children }) {
	//
	const [loginData, setLoginData] = useState({});

	//
	const setLoginState = useCallback(
		({
			logout,
			token,
			loginType,
			profile: prof,
			tokenValidity,
			refreshToken,
		}) => {
			const profile = { ...prof };

			if (logout) {
				localStorage.clear();
				cookies.remove("accessor");
				cookies.remove("loginType");
				cookies.remove("tokenValidity");
				setLoginData({});
				return;
			}
			console.log("LoginState", {
				token,
				loginType,
				profile,
				tokenValidity,
			});
			if (loginType === "admin") {
				const role = (() => {
					switch (profile?.role?.[0].toLowerCase()) {
						case "numbering resource manager":
							return "nrm";
						case "necnra engineer":
							return "necnra";
						case "director regulatory administration" ||
							"deputy director regulatory administration":
							return "dra";
						case "system admin":
							return "sysadmin";
						default:
							return "";
					}
				})();
				profile.workingRole = role;
			}

			if (token) {
				cookies.set("accessor", token, {
					path: "/",
					expires: new Date(tokenValidity),
				});
			}
			if (refreshToken) {
				cookies.set("refreshToken", refreshToken, {
					path: "/",
					expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
				});
			}
			if (loginType) {
				cookies.set("loginType", loginType, {
					path: "/",
					expires: new Date(tokenValidity),
				});
			}
			if (tokenValidity) {
				cookies.set("tokenValidity", tokenValidity, {
					path: "/",
					expires: new Date(tokenValidity),
				});
			}

			localStorage.setItem(
				"Login",
				JSON.stringify({ loginType, profile, tokenValidity })
			);
			setLoginData({
				token,
				loginType,
				profile,
				tokenValidity,
			});

			// LogRocket.identify(profile.id, {
			//   ...profile,
			// });
		},
		[]
	);

	const loggedIn = !!loginData.loginType;

	const loginMemo = React.useMemo(
		() => ({
			...loginData,
			setLoginState,
			loggedIn,
		}),
		[loginData, setLoginState, loggedIn]
	);

	async function refreshToken() {
		const refreshToken = cookies.get("refreshToken");

		const response = await fetch(`${config.baseUrl}admin/refresh-token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
		});
		const data = await response.json();
		console.log(data);
		return data;
	}

	useEffect(() => {
		const refreshTokenThreshold = 5 * 60 * 1000; // 5 minutes

		const token = cookies.get("accessor");
		const savedData = JSON.parse(localStorage.getItem("Login"));
		const tokenValidity = cookies.get("tokenValidity");

		if (token && !loginData?.loginType) {
			if (savedData?.loginType) setLoginState({ token, ...savedData });
			// return null;
		}

		if (token && new Date(tokenValidity) < new Date()) {
			// Token has expired, log the user out
			setLoginState({ logout: true });
			// Redirect the user to the login page
			window.location.href = "/auth/login";
		}

		// Add event listeners to detect user activity
		const onUserActivity = async () => {
			if (loggedIn) {
				const tokenValidity = cookies.get("tokenValidity");

				if (new Date(tokenValidity) - Date.now() < refreshTokenThreshold) {
					const { newToken, newTokenValidity } = await refreshToken();

					setLoginState({
						...loginData,
						token: newToken,
						tokenValidity: newTokenValidity,
					});

					cookies.set("accessor", newToken, {
						path: "/",
						expires: new Date(newTokenValidity),
					});

					cookies.set("tokenValidity", newTokenValidity, {
						path: "/",
						expires: new Date(newTokenValidity),
					});

					localStorage.setItem(
						"Login",
						JSON.stringify({
							...JSON.parse(localStorage.getItem("Login")),
							tokenValidity: newTokenValidity,
						})
					);
				}
			}
		};

		document.addEventListener("mousemove", onUserActivity);
		document.addEventListener("mousedown", onUserActivity);
		document.addEventListener("keydown", onUserActivity);
		document.addEventListener("scroll", onUserActivity);

		return () => {
			document.removeEventListener("mousemove", onUserActivity);
			document.removeEventListener("mousedown", onUserActivity);
			document.removeEventListener("keydown", onUserActivity);
			document.removeEventListener("scroll", onUserActivity);
		};
	}, [loginData, setLoginState]);

	return (
		<LoginContext.Provider value={loginMemo}>{children}</LoginContext.Provider>
	);
}

LoginProvider.propTypes = {
	children: PropTypes.shape({}).isRequired,
};
