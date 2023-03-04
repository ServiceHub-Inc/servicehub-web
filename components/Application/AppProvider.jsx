import PropTypes from "prop-types";
import { useState } from 'react';
import Head from "next/head";
import {MantineProvider, ColorSchemeProvider, ColorScheme, AppShell} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Router from "next/router";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import { SideNav } from "./Sidebar";

const AppProvider = ({ children }) => {
  
  const router = Router.useRouter();
  const showComponents =
    window.location.pathname !== "/login/"  &&
    window.location.pathname !== "/register/";
  
  const showDashboard= window.location.pathname === '/users/';

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
          classNames={{
            modal:{
              modal: "max-w-[min(100vw,720px)] w-full",
              title: "text-center w-full",
              header:
                "bg-primary text-center w-full rounded-md p-2 text-white font-bold",
              body: " border border-solid border-gray-200 rounded-md p-6",
              close: "text-white hover:text-primary",
            } 
          }}
          theme={{
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
          
          <Notifications autoClose={4000}/>
            <ModalsProvider
              modalProps={{
                classNames: {
                  modal: "max-w-[min(100vw,720px)] w-full",
                  title:"text-center w-full font-bold bg-primary text-center w-full rounded-md p-3  text-white font-bold",
                  header:'',
                  body: " border border-solid border-gray-200 rounded-md p-6",
                  close: "text-primary text-3xl hover:text-red-800",
                },
              }}
           
            >
              <div className="h-screen ">
                <AppShell
                  navbar={showDashboard && <SideNav />}
                  header={showComponents && <AppHeader />}
                  footer={showComponents && <AppFooter />}
                >
                  <div
                    className={` ${
                      window.location.pathname !== "/login/" &&
                      window.location.pathname !== "/register/"
                        ? "min-h-screen"
                        : "min-h-[calc(100vh-150px)]"
                    }`}
                  >
                    {children}
                  </div>
                </AppShell>
              </div>
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
