import { SideNav } from "../../components/Application/Dashboard/Sidebar";
import { HeaderTabs } from "./Navbar";
import { useState } from "react";
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
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import Head from "next/head";
import { Logo } from "../../components/Application/AppHeader";
import Breadcrumb from "../../components/utils/BreadCrumbs";
import withAuth from "../../lib/withAuth";

const Dashboard = ({ children, title }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  //Setting Color Scheme
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

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
                : theme.colors.gray[0],
            padding: "4px",
            margin: "4px",
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="xs"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
            height={500}
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
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={{ base: 63 }} className="">
            <div className="hidden sm:block">
              <HeaderTabs />
            </div>
            <div className="flex items-center">
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <div className="sm:hidden">
                <Logo />
              </div>
            </div>
          </Header>
        }
      >
        {/* Main DashBoard Items Content */}
        <main className="px-4">
          <Container size="xl">
            <div className="flex items-center justify-between mx-6">
              <Breadcrumb items={breadcrumbs} />
              <Title order={3} className="text-gray-500 text-center mb-2">
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
