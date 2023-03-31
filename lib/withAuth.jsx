import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    //const { isLoggedIn } = useContext(LoginContext);
    const isLoggedIn = false;

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
