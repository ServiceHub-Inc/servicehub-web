import { SideNav } from "../../components/Application/Dashboard/Sidebar";
import { HeaderTabs } from "../../components/Application/Navbar";
import { useContext, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Anchor,
  Container,
  Title,
  ActionIcon,
  createStyles,
  useMantineColorScheme,
  Avatar,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import Head from "next/head";
import { Logo } from "../../components/Application/AppHeader";
import Breadcrumb from "../../components/utils/BreadCrumbs";
import withAuth from "../../lib/withAuth";
import AppFooter from "../../components/Application/AppFooter";
import { LoginContext } from "../../lib/contexts/LoginContext";
import config from "../../lib/config";

const Dashboard = ({ children, title }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  //Setting Color Scheme
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const { profile } = useContext(LoginContext);

  //BreadCrumb Function
  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: title, href: "/dashboard/users" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <>
      <Head>
        <title>ServiceHub | Dashboard</title>
      </Head>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.white,
            padding: "1px",
            margin: "1px",
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="xs"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 250, lg: 300 }}
            height={600}
            className=""
          >
            <SideNav activeItem={title || "Home"} />
            <Text className="text-gray-300 text-xs font-semibold text-center ">
              ServiceHub Admin v1.0
            </Text>
          </Navbar>
        }
        // aside={
        //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //       <Text>Application sidebar</Text>
        //     </Aside>
        //   </MediaQuery>
        // }

        // footer={
        //   <Footer height={60}>
        //     <AppFooter />
        //   </Footer>
        // }
        header={
          <Header height={{ base: 63 }} className=" ">
            <div className="hidden md:block">
              <HeaderTabs />
            </div>
            <div className="flex items-center justify-between mx-4">
              <div className="flex items-center ml-2">
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.green[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <div className="md:hidden flex items-center">
                  <Logo />
                </div>
              </div>
              <div className="sm:hidden flex justify-end">
                <Avatar
                  src={
                    profile.imageUrl ? config.baseUrl + profile.imageUrl : null
                  }
                  color="green"
                  alt={profile.firstName}
                  radius={24}
                  size={24}
                >
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </Avatar>
              </div>
            </div>
          </Header>
        }
      >
        {/* Main DashBoard Items Content */}
        <main className="px-2">
          <Container size="xl">
            <div className="flex items-center justify-between mr-12">
              <Breadcrumb items={breadcrumbs} />
              <Title order={3} className="text-gray-500 text-center mb-2 mr-12">
                {title}
              </Title>
              {/* Dark mode Switch */}
              <p className="flex justify-end ">
                <ActionIcon
                  variant="outline"
                  color={dark ? "yellow" : "green"}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {dark ? (
                    <IconSun size="1.1rem" />
                  ) : (
                    <IconMoonStars size="1.1rem" />
                  )}
                </ActionIcon>
              </p>
            </div>

            {/* Dashboard Pages */}
            <div>{children}</div>
          </Container>
        </main>
      </AppShell>
    </>
  );
};

export default withAuth(Dashboard);
