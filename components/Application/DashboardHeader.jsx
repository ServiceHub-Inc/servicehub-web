/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { createStyles, Text, Burger, Header } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
// import { IconBuildingBank } from '@tabler/icons';
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo-1.webp";
import UserMenu from "./HeaderAvatar";

const useStyles = createStyles((theme) => ({
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.fn.variant({
			variant: "filled",
			color: theme.primaryColor,
		}).background,
		borderBottom: `1px solid ${
			theme.fn.variant({ variant: "filled", color: theme.primaryColor })
				.background
		}`,
		marginBottom: 120,
	},

	mainSection: {
		paddingBottom: theme.spacing.sm,
	},

	user: {
		color: theme.white,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: "background-color 100ms ease",

		"&:hover": {
			backgroundColor: theme.fn.lighten(
				theme.fn.variant({ variant: "filled", color: theme.primaryColor })
					.background,
				0.1
			),
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
		backgroundColor: theme.fn.lighten(
			theme.fn.variant({ variant: "filled", color: theme.primaryColor })
				.background,
			0.1
		),
	},
}));

export function Logo() {
	return (
		<Link href="/" passHref>
			<div className="mt-5 lg:mt-1 w-20 h-12 lg:w-32 lg:h-18">
				<a href="/a">
					<Image src={logo} alt="logo" />
				</a>
			</div>
		</Link>
	);
}

export function DashboardHeader() {
	const context = JSON.parse(localStorage.getItem("context"));
	const username = context?.username;
	const [scroll, scrollTo] = useWindowScroll();
	const { classes } = useStyles();
	const [opened, { toggle }] = useDisclosure(false);

	return username ? (
		<Header className="fixed  transition-all duration-300 shadow-md px-4 lg:px-8 z-[100]">
			<div className="flex justify-between items-center h-[65px] w-full">
				<Logo className="mt-2" />

				<Burger
					opened={opened}
					onClick={toggle}
					className={classes.burger}
					size="sm"
				/>
				<UserMenu />
			</div>
		</Header>
	) : (
		<div />
	);
}
