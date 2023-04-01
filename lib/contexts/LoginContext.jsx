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
  //
  const [tokenValidity, setTokenValidity] = useState(Date.now() + 3600 * 1000);

  //
  const setLoginState = useCallback(
    ({ logout, token, loginType, profile: prof, tokenValidity }) => {
      const profile = { ...prof };

      if (logout) {
        localStorage.clear();
        cookies.remove("accessor");
        cookies.remove("loginType");
        setLoginData({});
        return;
      }
      console.log("setLoginState", {
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

      localStorage.setItem("context", JSON.stringify({ loginType, profile }));
      setLoginData({
        token,
        loginType,
        profile,
        tokenValidity: Date.now() + 3600 * 1000,
      });
      setTokenValidity(Date.now() + 3600 * 1000);
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
    const savedData = JSON.parse(localStorage.getItem("context"));
    if (token && !loginData?.loginType) {
      if (savedData?.loginType) setLoginState({ token, ...savedData });
      // return null;
    }
    const tokenValidity = cookies.get("tokenValidity");
    if (token && new Date(tokenValidity) < new Date()) {
      // Token has expired, log the user out
      setLoginState({ logout: true });
      // Redirect the user to the login page
      window.location.href = "/login";
    }

    // const {  loginType, profile } = loginData;
    // if ( !profile || !loginType ) return null;
    // function logoutListener() {
    //   setLoginState({ logout: true });
    //   console.log('logout');
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
