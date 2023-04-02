import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  createStyles,
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  Stack,
  rem,
  NavLink,
} from "@mantine/core";
import {
  IconChartDots2,
  IconUsers,
  IconReportAnalytics,
  IconFriends,
  IconNotification,
  IconSettings,
  IconLayoutDashboard,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons";
import { Logo } from "../AppHeader";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    paddingLeft: "10px",
  },

  aside: {
    flex: "0 0 60px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.green[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: "20px",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.fn.primaryColor(),
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
  },

  logo: {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    height: 25,
    paddingTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    // textAlign: "center",
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    // padding: "4px",
    fontSize: theme.fontSizes.sm,
    marginLeft: theme.spacing.md,
    // marginRight: theme.spacing.md,
    fontWeight: 500,
    // height: 50,
    lineHeight: "35px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeft: "4px solid",
      paddingLeft: theme.spacing.sm,
      borderLeftColor: theme.fn.primaryColor(),
      // backgroundColor: theme.fn.primaryColor(),
      color: theme.fn.primaryColor(),
    },
  },
}));

const mainLinksData = [
  { icon: IconLayoutDashboard, label: "Dashboard", subLinks: "Dash" },
  { icon: IconUsers, label: "Users", subLinks: "The users" },
  { icon: IconFriends, label: "Services", subLinks: "service 1" },
  { icon: IconNotification, label: "Notifications" },
  { icon: IconReportAnalytics, label: "Reporting" },
  { icon: IconChartDots2, label: "Analytics" },
  { icon: IconSettings, label: "Settings" },
];

const userSubLinks = ["Users", "Banned", "Verification"];
const dashSubLinks = ["Dashboard"];
const servicesSubLinks = ["Services", "Requests", "Providers", "Types"];
const adminSubLinks = ["Admins"];

export function SideNav() {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Dashboard");
  const [activeLink, setActiveLink] = useState("Dashboard");
  let links;

  const mainLinks = mainLinksData.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      color="lime"
      withArrow
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.label === active,
        })}
      >
        <link.icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  if (active == "Dashboard")
    links = dashSubLinks.map((link) => (
      <Link href={`/dashboard/${link.toLowerCase()}`} key={link}>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: activeLink === link,
          })}
          onClick={(e) => {
            setActiveLink(link);
          }}
          // }}
        >
          {link}
        </a>
      </Link>
    ));

  if (active == "Users")
    links = userSubLinks.map((link) => (
      <Link href={`/dashboard/${link.toLowerCase()}`} key={link}>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: activeLink === link,
          })}
          onClick={(e) => {
            setActiveLink(link);
          }}
          // }}
        >
          {link}
        </a>
      </Link>
    ));

    if(active == "Dashboard")

    links = adminSubLinks.map((link) => (
      <Link href={`/dashboard/${link.toLowerCase()}`} key={link}>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: activeLink === link,
          })}
          onClick={(e) => {
            setActiveLink(link);
          }}
          // }}
        >
          {link}
        </a>
      </Link>
    ));

  return (
    <Navbar width={{ base: 300 }} height={661} p="xs" className="fixed left-0">
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          {/* <div className={classes.logo}>
            <Logo type="mark" size={20} />
          </div> */}
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>
          {/* {subLinks} */}
          <ul className="list-none">
            <Link href="#">
              <li>{active}</li>
            </Link>
          </ul>
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
