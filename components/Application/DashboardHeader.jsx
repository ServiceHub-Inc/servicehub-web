/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import {
	createStyles,
	Text,
	Burger,
	Header,
	Anchor,
	Title,
	ActionIcon,
	useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
// import { IconBuildingBank } from '@tabler/icons';
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo-1.webp";
import UserMenu from "./HeaderAvatar";
import Breadcrumb from "../utils/BreadCrumbs";
import { IconMoonStars, IconSun } from "@tabler/icons";

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

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	const items = window.location.pathname.split("/").map((item, index) => (
		<Anchor href={item.href} key={index}>
			{item}
		</Anchor>
	));

	// username ? (
	return (
		<Header className="fixed  transition-all duration-300 shadow-md px-4 lg:px-8 z-[100]">
			<div className="grid grid-cols-3 items-center h-[65px] w-full">
				<Logo className="mt-2 " />

				<div className="flex justify-center">
					<Breadcrumb items={items} />
				</div>

				<Burger
					opened={opened}
					onClick={toggle}
					className={classes.burger}
					size="sm"
				/>
				<div className="flex justify-end">
					{/* Dark mode Switch */}
					<p className="flex justify-end mr-10">
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
					<UserMenu />
				</div>
			</div>
		</Header>
	);
	// : (
	// 	<div />
	// );
}
