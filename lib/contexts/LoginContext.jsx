import { useState, createContext, useCallback, useEffect } from "react";
// import LogRocket from 'logrocket';
import PropTypes from "prop-types";
import React from "react";
import Cookies from "universal-cookie";
// import apiFetcher from '../api/apiFetcher';

export const LoginContext = createContext();

const cookies = new Cookies();
export function LoginProvider({ children }) {
  //

  const [loginData, setLoginData] = useState({});
  // const tokenValidity = Date.now() + 3600 * 1000;

  //
  const setLoginState = useCallback(
    ({ logout, token, loginType, profile: prof, tokenValidity }) => {
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
        JSON.stringify({ loginType, profile, tokenValidity }),
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
    [],
  );

  const loggedIn = !!loginData.loginType;

  const loginMemo = React.useMemo(
    () => ({
      ...loginData,
      setLoginState,
      loggedIn,
    }),
    [loginData, setLoginState, loggedIn],
  );

  useEffect(() => {
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
      window.location.href = "/login";
    }

    // const { loginType, profile } = loginData;
    // if (!profile || !loginType) return null;
    // function logoutListener() {
    //   setLoginState({ logout: true });
    //   console.log("logout");
    // }
    // document.addEventListener('logout', logoutListener);
    // function logoutListener() {
    //   setLoginState({ logout: true });
    //   console.log('logout');
    // }
    // loginType === 'enrollment'
    //     ? 'refreshEnrollmentToken'
    //     : 'refreshStudentToken';

    // if (new Date() < new Date(tokenValidity)) return null;

    // apiFetcher({ endpoint, token }).then((res) => {
    //   console.table('token-refresh', res);
    //   if (res.status !== '000') {
    //     setLoginState({
    //       logout: true,
    //     });
    //   }
    //   setLoginState({
    //     ...loginData,
    //     token: res.token,
    //     tokenValidity: res.token_validity,
    //   });
    // });

    // return () => document.removeEventListener('logout', logoutListener);
  }, [loginData, setLoginState]);

  return (
    <LoginContext.Provider value={loginMemo}>{children}</LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
