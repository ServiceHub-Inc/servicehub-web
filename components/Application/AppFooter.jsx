import React from "react";
import { createStyles, Container, Group, ActionIcon } from "@mantine/core";
import { BrandTwitter, Mail, BrandInstagram } from "tabler-icons-react";
import { Logo } from "./AppHeader";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 10,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingBottom: theme.spacing.sm,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.sm,
    },
  },
}));

const socials = [
  {
    icon: <BrandTwitter size={22} />,
    link: "https://twitter.com/DodooRegwels",
    label: "Twitter",
  },
  {
    icon: <BrandInstagram size={22} />,
    link: "https://www.instagram.com/quickfix_officina/",
    label: "Instagram",
  },
  {
    icon: <Mail size={22} />,
    link: "mailto:quickfixofficina@gmail.com",
    label: "Mail",
  },
];

export default function AppFooter() {
  const { classes } = useStyles();

  return (
    <div className={`${classes.footer} px-8 pb-3 lg:pb-0`}>
      <div className={classes.inner}>
        <Logo />
        <Group spacing={6} className={classes.links} position="right" noWrap>
          {socials.map((item) => (
            <ActionIcon size="lg" key={item.label}>
              <Link href={item.link} passHref>
                <a target="_blank" className="text-primary">
                  {item.icon}
                </a>
              </Link>
            </ActionIcon>
          ))}
        </Group>
      </div>
    </div>
  );
}
