/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import {
	Avatar,
	UnstyledButton,
	Group,
	Text,
	Menu,
	createStyles,
} from "@mantine/core";
import { IconLogout, IconChevronDown } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
	user: {
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: "background-color 100ms ease",

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
		},

		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	userActive: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
	},
}));

export default function UserMenu() {
	const context = JSON.parse(localStorage.getItem("context"));
	const { classes, cx } = useStyles();
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	const user = {
		name: context?.userName || "Admin Account",
		email: context?.institutionName || "admin@mail.com",
		image:
			"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
	};

	if (context) {
		return (
			<Menu
				width={260}
				position="bottom-end"
				transition="pop-top-right"
				opened={userMenuOpened}
				onClose={() => setUserMenuOpened(false)}
				onOpen={() => setUserMenuOpened(true)}
			>
				<Menu.Target>
					<UnstyledButton
						className={cx(classes.user, {
							[classes.userActive]: userMenuOpened,
						})}
					>
						<Group spacing={7}>
							<Avatar src={user.image} alt={user.name} radius="xl" size={20} />
							<Text
								weight={500}
								size="sm"
								sx={{ lineHeight: 1 }}
								mr={5}
								ml={3}
								className="text-primary"
							>
								{user.name}
							</Text>
							<IconChevronDown
								size={14}
								stroke={1.5}
								className="text-primary"
							/>
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					{/* <Link href="/account-settings" passHref>
          <Menu.Item
            icon={
              <IconSettings size={14} stroke={1.5} className="text-[#0b765c]" />
            }
          >
            Account Settings
          </Menu.Item>
        </Link>

        <Link href="/histpry" passHref>
          <Menu.Item
            icon={
              <IconHistory size={14} stroke={1.5} className="text-[#0b765c]" />
            }
          >
            History
          </Menu.Item>
        </Link>

        <Link href="#" passHref>
          <Menu.Item
            icon={
              <IconStar size={14} stroke={1.5} className="text-[#0b765c]" />
            }
          >
            Snapshots
          </Menu.Item>
        </Link> */}

					<Link href="/logout" className="no-underline" passHref shallow>
						<Menu.Item
							icon={
								<IconLogout size={16} stroke={2.0} className="text-primary" />
							}
						>
							Logout
						</Menu.Item>
					</Link>
				</Menu.Dropdown>
			</Menu>
		);
	}
	return <div>Nothing</div>;
}
