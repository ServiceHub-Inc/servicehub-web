import { useState, useContext } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons";
import { Logo } from "./AppHeader";
import { LoginContext } from "../../lib/contexts/LoginContext";
import config from "../../lib/config";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainSection: {
    paddingBottom: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
    maxWidth: "100%",
  },

  user: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.fn.primaryColor(),
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.green[0],
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : "transparent",
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

const details = {
  user: {
    name: "Frank Thomas",
    email: "frank@servicehub.com",
    image:
      "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  },
  tabs: [
    "Services",
    "Pending Services",
    "Promoted",
    "Requested",
    "Completed",
    "Support",
  ],
};

export function HeaderTabs({}) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = details.tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  //Getting Login State
  const { setLoginState, token, profile } = useContext(LoginContext);

  console.log(token);
  //Logout Function
  const handleLogout = () => {
    setLoginState({ logout: true });
    // redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className={classes.header}>
      <Container className="py-1 mx-4 max-w-full">
        <Group className="flex items-center justify-between">
          <Logo />
          <Menu>
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={8} className="mx-4">
                  <Avatar
                    src={config.baseUrl + profile.imageUrl}
                    alt={profile.firstName}
                    radius="xl"
                    size={25}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={2}>
                    {profile.firstName}
                  </Text>
                  <IconChevronDown size={rem(15)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Item
                icon={
                  <IconHeart
                    size="0.9rem"
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                icon={
                  <IconStar
                    size="0.9rem"
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                icon={
                  <IconMessage
                    size="0.9rem"
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item> */}

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item
                icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
              >
                Change account
              </Menu.Item>
              <Menu.Item
                icon={<IconLogout size="0.9rem" stroke={1.5} />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>

              <Menu.Divider />
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        {/* <Tabs
          defaultValue="Services"
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs> */}
      </Container>
    </div>
  );
}
