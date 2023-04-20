import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { LoginContext } from "./contexts/LoginContext";

const withAuth = (Component) => {
	const Auth = (props) => {
		const router = useRouter();
		const { loggedIn } = useContext(LoginContext);

		useEffect(() => {
			if (!loggedIn) {
				router.push("/auth/login");
			}
		}, [loggedIn, router]);

		if (!loggedIn) {
			return null;
		}

		return <Component {...props} />;
	};

	return Auth;
};

export default withAuth;
