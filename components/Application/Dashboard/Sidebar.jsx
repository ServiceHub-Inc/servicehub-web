import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoginContext } from "../../../lib/contexts/LoginContext";
import {
	createStyles,
	Navbar,
	UnstyledButton,
	Tooltip,
	Title,
} from "@mantine/core";
import {
	IconChartDots2,
	IconUsers,
	IconReportAnalytics,
	IconFriends,
	IconNotification,
	IconSettings,
	IconLayoutDashboard,
	IconUserCircle,
	IconLogout,
} from "@tabler/icons";

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
		height: 50,
		borderRadius: "15px",
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
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		alignItems: "center",
		justifyContent: "center",
		color: theme.fn.primaryColor(),
		marginBottom: theme.spacing.md,
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		padding: theme.spacing.md,
		paddingTop: 18,
		height: 60,
	},

	logo: {
		display: "flex",
		justifyContent: "center",
		paddingBottom: theme.spacing.sm,
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
		paddingLeft: theme.spacing.md,
		// marginRight: theme.spacing.md,
		fontWeight: 500,
		// height: 50,
		lineHeight: "35px",

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.green[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},

	linkActive: {
		"&, &:hover": {
			borderLeft: "4px solid",
			paddingLeft: theme.spacing.md,
			borderLeftColor: theme.fn.primaryColor(),
			// backgroundColor: theme.fn.primaryColor(),
			color: theme.fn.primaryColor(),
		},
	},
}));

const mainLinksMockdata = [
	{ icon: IconLayoutDashboard, label: "Home" },
	{ icon: IconUsers, label: "Users" },
	{ icon: IconFriends, label: "Services" },
	{ icon: IconNotification, label: "Notifications" },
	{ icon: IconReportAnalytics, label: "Reporting" },
	{ icon: IconChartDots2, label: "Analytics" },
	{ icon: IconUserCircle, label: "Admins" },
	{ icon: IconSettings, label: "Settings" },
];

//Footer Links
const footerData = [{ icon: IconLogout, label: "LogOut" }];

//SubLinks
const userSubLinks = ["Users", "Banned", "Verification"];
const dashSubLinks = ["Home"];
const servicesSubLinks = ["Services", "Requests", "Providers", "Types"];
const adminSubLinks = ["Admins"];

export function SideNav({ activeItem }) {
	//Getting Login State
	const { setLoginState } = useContext(LoginContext);

	//Logout Function
	const handleLogout = () => {
		setLoginState({ logout: true });
		// redirect to login page
		window.location.href = "/login";
	};

	const router = useRouter();
	const { classes, cx } = useStyles();
	const [active, setActive] = useState(activeItem || "Home");
	const [activeLink, setActiveLink] = useState(activeItem || "Home");
	let links;

	const mainLinks = mainLinksMockdata.map((link) => (
		<Tooltip
			label={link.label}
			position="right"
			withArrow
			color="green"
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

	const footerLink = footerData.map((link) => (
		<Tooltip
			label={link.label}
			position="right"
			withArrow
			color="red"
			key={link.label}
		>
			<UnstyledButton
				onClick={handleLogout}
				className={cx(classes.mainLink, {
					[classes.mainLinkActive]: link.label === active,
				})}
			>
				<link.icon className="text-red-700 hover:text-red-600" stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	));
	if (active == "Home")
		links = dashSubLinks.map((link) => (
			<Link href={`/dashboard/home`} key={link}>
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

	if (active == "Admins")
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
	if (active == "Services")
		links = servicesSubLinks.map((link) => (
			<Link href={"#"} key={link}>
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
		<Navbar.Section className="flex pl-2 mt-[20px]">
			<div className={classes.aside}>
				<span>{mainLinks}</span>

				<span className="mt-12"> {footerLink}</span>
			</div>

			<div className={classes.main}>
				<Title order={4} className={classes.title}>
					{active}
				</Title>
				{links}
			</div>
		</Navbar.Section>
	);
}
