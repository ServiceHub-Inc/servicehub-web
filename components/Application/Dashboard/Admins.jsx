import { useState, useEffect, useContext } from "react";
import moment from "moment";
import {
	Avatar,
	Indicator,
	Divider,
	Paper,
	Pagination,
	useMantineColorScheme,
	CopyButton,
	Menu,
	createStyles,
	Table,
	Button,
	Group,
	Text,
	rem,
	Rating,
	Tooltip,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { modals, openModal } from "@mantine/modals";
import {
	MdOutlineMarkEmailRead,
	MdPhoneIphone,
	MdLocationPin,
	MdVerified,
	MdVerifiedUser,
	MdSportsScore,
	MdScoreboard,
	MdStars,
} from "react-icons/md";
import { BsStarHalf } from "react-icons/bs";
import { SiGooglemessages } from "react-icons/si";
import {
	IconSelector,
	IconChevronDown,
	IconChevronUp,
	IconUserPlus,
	IconArrowsLeftRight,
	IconEye,
	IconDotsVertical,
	IconTrash,
	IconCircleCheck,
	IconEdit,
	IconExternalLink,
} from "@tabler/icons";
import UserModal from "../../utils/Modal";
import AddAdminForm from "../../Forms/AddAdminForm";
import UserTable from "../../Forms/UserTable";
import { BsSend, BsFillShareFill } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import TableDataProp from "../../Forms/DataProp";

import { useAdminsContext } from "../../../lib/hooks/useAdminsContext";
import Head from "next/head";
import EditAdminForm from "../../Forms/EditAdminForm";
import config from "../../../lib/config";
import notify from "../../../lib/notify";
import { LoginContext } from "../../../lib/contexts/LoginContext";

const useStyles = createStyles((theme) => ({
	inner: {
		display: "flex",
		justifyContent: "space-between",
		paddingTop: theme.spacing.xl * 4,
		paddingBottom: theme.spacing.xl * 4,
	},

	content: {
		maxWidth: 480,
		marginRight: theme.spacing.xl * 3,

		[theme.fn.smallerThan("md")]: {
			maxWidth: "100%",
			marginRight: 0,
		},
	},

	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 44,
		lineHeight: 1.2,
		fontWeight: 900,

		[theme.fn.smallerThan("xs")]: {
			fontSize: 28,
		},
	},

	control: {
		[theme.fn.smallerThan("xs")]: {
			flex: 1,
		},
	},

	image: {
		flex: 1,

		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
	},

	highlight: {
		position: "relative",
		backgroundColor: theme.fn.variant({
			variant: "light",
			color: "#32CD32",
		}).background,
		borderRadius: theme.radius.sm,
		padding: "4px 12px",
	},
}));

export default function AdminsComponent() {
	//Delete Admin Confirmation.
	const DeleteModal = (admin) =>
		modals.openConfirmModal({
			centered: true,
			classNames: {
				header: "text-center",
				title:
					"w-full font-bold text-center w-full rounded-md text-red-500 font-bold",
				body: "text-center border-solid border-gray-200 rounded-md p-4",
				close: "text-white text-4xl hover:text-red-800",
				confirm: "text-center flex justify-content-center", // add justify-content-center here
			},
			title: `Delete Admin`,
			size: "sm",
			centered: true,
			children: (
				<Text fz="md" ta="center" className="pb-4">
					Are you sure you want to delete {`${admin.firstName}`}?
				</Text>
			),
			labels: { confirm: "Yes, Delete", cancel: "No, Cancel" },

			confirmProps: { color: "red", position: "left" },
			onCancel: () => console.log(admin.firstName),
			onConfirm: () => deleteAdmin(admin._id),
		});

	const [selectedAdmin, setSelectedAdmin] = useState(null);

	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = (adminId) => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setSelectedAdmin(null);
		setIsOpen(false);
	};

	// Using Context Api and destructing from global admin Context
	const { admins, dispatch } = useAdminsContext();

	//Getting Login State
	const { setLoginState, token, profile } = useContext(LoginContext);

	// prettier-ignore
	const headers = {
    "Authorization": `Bearer ${token}`,
  };

	const fetchAdmins = async () => {
		try {
			const response = await fetch(`${config.baseUrl}admins`, {
				headers,
			});
			if (!response.ok) {
				throw new Error("Error fetching admins");
			}
			const json = await response.json();
			//Dispatching a set admin action!
			dispatch({ type: "SET_ADMINS", payload: json });

			// localStorage.setItem("adminsList", JSON.stringify(admins));
		} catch (err) {
			console.error(`Error fetching admins: ${err.message}`);
			// Handle error
			notify.error({
				message: err.message,
			});
		}
	};

	useEffect(() => {
		if (profile) {
			fetchAdmins();
		}
	}, []);

	//Adding admin function
	const handleAddAdmin = (newAdmin) => {
		dispatch({ type: "ADD_ADMIN", payload: newAdmin });
		notify.success({
			message: `You've Added ${newAdmin.admin.firstName} as Admin`,
		});

		//Setting admins to LocalStorage
		// localStorage.setItem("adminsList", JSON.stringify([newAdmin, ...adminsList]));
	};

	//"Updating Admin function"
	const handleUpdateAdmin = (updatedAdmin) => {
		dispatch({ type: "UPDATE_ADMIN", payload: updatedAdmin });
		notify.success({
			message: `You've updated ${updatedAdmin.firstName}'s details`,
		});
	};

	// Function to remove/Delete a admin from the list
	const deleteAdmin = async (_id) => {
		try {
			const response = await fetch(`${config.baseUrl}admin/${_id}`, {
				method: "DELETE",
				headers,
			});

			const json = await response.json();
			if (response.ok) {
				dispatch({ type: "DELETE_ADMIN", payload: json });
				notify.success({
					message: `Admin Deleted Successfully!`,
				});
			}

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Error deleting admin");
			}

			// Remove admin from adminsList state and local storage
		} catch (err) {
			console.error(`Error deleting admin: ${err.message}`);
			// Handle error
		}
	};

	const { classes } = useStyles();

	//------------------------------ADD ADMIN MODAL---------------------------//
	const openAddAdminModal = () => {
		const id = modals.open({
			centered: true,
			classNames: {
				header: "text-center bg-primary m-3",
				title:
					"text-center w-full font-bold text-center w-full rounded-md text-white font-bold",
				body: " border border-solid border-gray-200 rounded-md p-6",
				close: "text-red-700  text-4xl hover:text-red-800",
			},
			title: (
				<Text
					ta="center"
					className="text-center w-full rounded-md text-white font-bold"
				>
					Add a new administrator
				</Text>
			),

			size: "90%",
			children: (
				<>
					<AddAdminForm addAdmin={handleAddAdmin} close={modals.closeAll} />
				</>
			),
		});
	};

	//-----------------------------ADD ADMIN MODAL ENDS HERE--------------------------------//

	//------------------------------EDIT ADMIN MODAL---------------------------//
	const openEditAdminModal = (admin) => {
		const id = modals.open({
			centered: true,
			classNames: {
				header: "text-center bg-primary m-3",
				title:
					"text-center w-full font-bold text-center w-full rounded-md text-white font-bold",
				body: " border border-solid border-gray-200 rounded-md p-6",
				close: "text-red-700  text-4xl hover:text-red-800",
			},
			title: (
				<Text
					ta="center"
					className="text-center w-full rounded-md text-white font-bold"
				>
					{`Edit ${admin.firstName}'s Details`}
				</Text>
			),

			size: "90%",
			children: (
				<>
					<EditAdminForm
						updateAdmin={handleUpdateAdmin}
						admin={admin}
						close={modals.closeAll}
					/>
				</>
			),
		});
	};

	//-----------------------------Edit ADMIN MODAL ENDS HERE--------------------------------//
	//For DAtA test Purposes--------------Merging Generated Admins and Added USers//

	//---------------------- PAGINATION BLOCK-----------------------//
	//Pagination
	const [activePage, setPage] = useState(1);
	const limit = 5;
	const perPage = Math.ceil(admins?.length / limit);

	const startIndex = (activePage - 1) * limit;
	const endIndex = startIndex + limit;
	const activePageData = admins?.slice(startIndex, endIndex); // Splicing Data PerPage

	//Handling Page Change
	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	//---------------------- PAGINATION BLOCK ENDS HERE-----------------------//

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	///Search functionality
	const [searchQuery, setSearchQuery] = useState("");
	const [sortField, setSortField] = useState("registeredAt");
	const [sortOrder, setSortOrder] = useState("desc");

	//filtering
	const filteredData = activePageData?.filter((admin) =>
		JSON.stringify(admin).toLowerCase().includes(searchQuery.toLowerCase())
	);

	//Highlight Text function
	const highlightedText = (text, searchQuery) => {
		const regex = new RegExp(searchQuery, "gi");
		return text.replace(regex, (match) => `<mark>${match}</mark>`);
	};

	const Icon = sortedData
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelector;
	//Sorting
	const sortedData = filteredData?.sort((a, b) => {
		const aValue = a[sortField];
		const bValue = b[sortField];
		if (aValue < bValue) {
			return sortOrder === "asc" ? -1 : 1;
		} else if (aValue > bValue) {
			return sortOrder === "asc" ? 1 : -1;
		} else {
			return 0;
		}
	});

	const clipboard = useClipboard({ timeout: 500 });
	return (
		<>
			<Head>
				<title>ServiceHub | Admins</title>
			</Head>
			<section>
				{/* SEarch Field */}
				<div className="items-center px-10 max-w-md mx-auto">
					<UserTable
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
				</div>

				{/*  */}

				<div className="flex justify-between items-center pt-4">
					<Button
						leftIcon={<IconUserPlus size={16} />}
						variant="light"
						color="green"
						onClick={openAddAdminModal}
						className="text-sm border-b-2 border-b-green-700"
					>
						ADD ADMIN
					</Button>
					<TableDataProp />
				</div>

				{/* Table Starts here */}
				<Table highlightOnHover className="pb-4">
					<thead>
						<tr className="bg-green-100 bg-opacity-25">
							<th>Image</th>
							<th
								className="hover:bg-green-50 px-2 cursor-pointer"
								onClick={() => setSortField("firstName")}
							>
								First Name
							</th>
							<th
								className="hover:bg-green-50 px-2"
								onClick={() => setSortField("lastName")}
							>
								Last Name
							</th>
							<th
								className="hover:bg-green-50 px-2"
								onClick={() => setSortField("idType")}
							>
								Role
							</th>
							<th onClick={() => setSortField("email")}>Email</th>
							<th
								className="hover:bg-green-50 px-2"
								onClick={() => setSortField("registeredAt")}
							>
								Reg Date
							</th>
							<th
								className="hover:bg-green-50 px-2"
								onClick={() => setSortField("verified")}
							>
								Verified
							</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							sortedData?.map((admin, index) => (
								<tr key={admin._id}>
									<td>
										<Group spacing="sm">
											<Avatar
												size={32}
												color="green"
												src={
													admin.imageUrl
														? config.baseUrl + admin.imageUrl
														: null
												}
												radius="xl"
												alt={admin.firstName}
												onClick={() => setSelectedAdmin(admin)}
												className="hover:shadow-md transition duration-150 ease-in-out cursor-pointer"
											>
												{admin?.firstName?.charAt(0)}
												{admin?.lastName?.charAt(0)}
											</Avatar>
											<div>
												<Text fz="xs" c="dimmed" className="text-gray-300">
													Sys Admin
												</Text>
											</div>
										</Group>
									</td>
									<td>{admin.firstName}</td>
									<td>{admin.lastName}</td>
									<td>{admin.role.toLowerCase()}</td>
									<td>{admin.email} </td>
									<td>{moment(admin.createdAt).format("MMMM Do YYYY")}</td>
									<td>
										<span className="text-primary">
											<IconCircleCheck />
										</span>
										<UserModal title="Admin Details">hello</UserModal>
									</td>
									<td>
										<div>
											<Menu
												transitionProps={{
													transition: "rotate-right",
													duration: 150,
												}}
												shadow="xl"
												offset={-4}
												position="left"
												width={200}
												withArrow
												arrowPosition="center"
											>
												<Menu.Target>
													<span>
														<IconDotsVertical className="hover:text-primary active:text-primary"></IconDotsVertical>
													</span>
												</Menu.Target>

												<Menu.Dropdown>
													<Menu.Label>Action</Menu.Label>
													<Menu.Item
														onClick={() => setSelectedAdmin(admin)}
														icon={<IconEye size={14} />}
													>
														View
													</Menu.Item>
													<Menu.Item
														onClick={() => openEditAdminModal(admin)}
														icon={<IconEdit size={14} />}
													>
														Edit
													</Menu.Item>
													<Menu.Divider />

													<Menu.Label>Danger zone - Careful</Menu.Label>
													<Menu.Item icon={<IconArrowsLeftRight size={14} />}>
														Transfer Data
													</Menu.Item>
													<Menu.Item
														onClick={() => DeleteModal(admin)}
														color="red"
														icon={<IconTrash size={14} />}
													>
														Delete Account
													</Menu.Item>
												</Menu.Dropdown>
											</Menu>
										</div>
										{/* <span>
                          <UserModal title="Admin Details">body</UserModal>
                        </span> */}

										{/* <span className="px-1 mx-1"><IconTrash/></span>
                      <span>
                        {approved ? <IconAdminCheck/> : "Not Approved" }
                      </span> */}
									</td>
								</tr>
							)) //Map
						}
					</tbody>
				</Table>

				<div>
					{selectedAdmin && (
						<UserModal
							title={`${selectedAdmin.firstName}'s Details`}
							isOpen={true}
							handleClose={handleClose}
						>
							<div className="pb-6 px-0 mx-0">
								<div className="relative h-40">
									<div
										className="absolute top-0 left-0 w-full h-full bg-cover bg-center "
										style={{
											backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661765242257-5539e1d1e644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwd29ya2Vyc3xlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60')`,
										}}
									></div>
									<div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm"></div>
									<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
										<Indicator
											inline
											size={18}
											offset={16}
											label={selectedAdmin.role.toLowerCase()}
											position="bottom-end"
											color="green"
											withBorder
										>
											<Avatar
												src={
													selectedAdmin.imageUrl
														? config.baseUrl + selectedAdmin.imageUrl
														: null
												}
												alt={selectedAdmin.firstName}
												radius={120}
												mx="auto"
												mt={-15}
												className="shadow-md hover:shadow-2xl"
												size={120}
											>
												{selectedAdmin.firstName.charAt(0)}
												{selectedAdmin.lastName.charAt(0)}
											</Avatar>
										</Indicator>
									</div>
								</div>
								<div className="flex items-center justify-center mb-4 mt-6 pt-2">
									<div className="ml-4 pt-2 flex items-center flex-col">
										<span className="pt-4 items-center">
											<span className="text-3xl font-bold text-primary">
												{selectedAdmin.firstName} {selectedAdmin.lastName}{" "}
											</span>
											<span>
												<MdVerified className="text-xl  text-blue-400" />
											</span>
										</span>
										<span className="pt-1">
											<Text c="dimmed" className="opacity-50 uppercase text-xs">
												SYS ADMIN
											</Text>
										</span>
										<span className="text-center pt-3">
											<Rating defaultValue={3} size="xs" readOnly />
										</span>

										<div className="flex items-center space-x-14 pt-3">
											<span className="flex flex-col justify-center items-center ">
												<BsSend className="text-lg text-green-700 hover:text-xl hover:text-primary cursor-pointer transition ease-in-out duration-150  " />
												<Tooltip
													label={`send ${selectedAdmin.lastName} an email`}
													radius="lg"
													color="green"
													withArrow
													position="left"
												>
													<Text
														ta="center"
														c="dimmed"
														className="text-base cursor-pointer hover:text-primary transition ease-in-out duration-150  accent-teal-200 pt-1"
													>
														Send email
													</Text>
												</Tooltip>
											</span>
											<Text
												ta="center"
												fz="xl"
												fw={700}
												className="text-primary"
											>
												•
											</Text>
											<span className="flex flex-col justify-center items-center">
												<SiGooglemessages className="text-xl text-green-700  hover:text-2xl hover:text-primary cursor-pointer transition ease-in-out duration-150  " />
												<Text
													ta="center"
													c="dimmed"
													className="text-base cursor-pointer hover:text-primary transition ease-in-out duration-150  accent-teal-200 pt-1"
												>
													Chat
												</Text>
											</span>
											<Text
												ta="center"
												fz="lg"
												fw={700}
												className="text-primary"
											>
												•
											</Text>
											<Menu
												transitionProps={{
													transition: "rotate-left",
													duration: 150,
												}}
												width={200}
												shadow="md"
											>
												<Menu.Target>
													<span className="flex flex-col justify-center items-center">
														<BsFillShareFill className="text-lg hover:text-xl text-blue-500 hover:text-primary cursor-pointer transition ease-in-out duration-150  " />
														<Text
															ta="center"
															c="dimmed"
															className="text-base cursor-pointer hover:text-primary transition ease-in-out duration-150  accent-teal-200 pt-1"
														>
															Share
														</Text>
													</span>
												</Menu.Target>

												<Menu.Dropdown>
													<CopyButton value="http://localhost:3000/profile/maxwell/">
														{({ copied, copy }) => (
															<Menu.Item
																icon={<MdContentCopy size={rem(14)} />}
															>
																<Text
																	color={copied ? "teal" : "blue"}
																	onClick={copy}
																>
																	{copied ? "Copied" : "Copy Link"}
																</Text>
															</Menu.Item>
														)}
													</CopyButton>

													<Menu.Item
														icon={<IconExternalLink size={rem(14)} />}
														component="a"
														href="http://localhost:3000/profile/maxwell/"
														target="_blank"
													>
														Open in new tab
													</Menu.Item>
												</Menu.Dropdown>
											</Menu>
										</div>
									</div>
								</div>

								<Paper className="px-6">
									<div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
										<div>
											<span className="text-xl font-medium mb-1 text-gray-500">
												<Divider
													label="Basic Information"
													color="green"
													labelPosition="center"
													my="sm"
												/>
											</span>
											<div className="flex items-center justify-start">
												<div className="text-md list-none ml-0">
													<li className="mb-1 text-gray-600 ">
														<div className="flex items-center ">
															<span>
																<MdOutlineMarkEmailRead className="text-primary" />
															</span>
															<span className="ml-2 text-gray-400">
																{selectedAdmin.email}
															</span>
														</div>
													</li>
													<li className="mb-1 text-gray-600 ">
														<div className="flex items-center ">
															<span>
																<MdPhoneIphone className="text-primary" />
															</span>
															<span className="ml-2 text-gray-400">
																{selectedAdmin.phone}
															</span>
														</div>
													</li>
													<li className="mb-1 text-gray-600 ">
														<div className="flex items-center ">
															<span>
																<MdLocationPin className="text-primary" />
															</span>
															<span className="ml-2 text-gray-400">
																{selectedAdmin.address} | {selectedAdmin.city}
															</span>
														</div>
													</li>
												</div>
											</div>
										</div>

										<div>
											<span className="text-xl font-medium mb-1 text-gray-500">
												<Divider
													label="Profile Highlight"
													color="green"
													labelPosition="right"
													my="sm"
												/>
											</span>
											<Paper shadow="lg" p="xs" radius="md" className="px-8">
												<div className="text-md  list-none ml-0">
													<li className="mb-1 text-gray-600 ">
														<div className="flex justify-between ">
															<div className="flex">
																<span>
																	<MdSportsScore className="text-xl text-primary" />
																</span>
																<span className="ml-2 text-sm">
																	Customer Service Quiz Score
																</span>
															</div>
															<div className="text-primary font-semibold">
																98%
															</div>
														</div>
													</li>

													<li className="mb-1 text-gray-600 ">
														<div className="flex justify-between ">
															<div className="flex">
																<span>
																	<MdScoreboard className="text-lg text-primary" />
																</span>
																<span className="ml-2 text-sm">
																	Services Executed
																</span>
															</div>
															<div className="text-primary font-semibold">
																50
															</div>
														</div>
													</li>

													<li className="mb-1 text-gray-600 ">
														<div className="flex justify-between ">
															<div className="flex">
																<span>
																	<MdStars className="text-lg text-primary" />
																</span>
																<span className="ml-2 text-sm">
																	Average Rating
																</span>
															</div>
															<div className="text-amber-400 font-semibold">
																<BsStarHalf /> 3.5
															</div>
														</div>
													</li>
												</div>
											</Paper>
										</div>
									</div>
								</Paper>
							</div>

							{/* <div className="flex justify-center ">
                <Link href={`/dashboard/admins/${selectedAdmin._id}/`}>
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<IconExternalLink size="0.9rem" />}
                    compact
                  >
                    Full Profile View
                  </Button>
                </Link>
              </div> */}
						</UserModal>
					)}
				</div>
				<div className="py-2 my-1 mx-4 flex  items-center justify-between ">
					<span>
						<Text size="sm" c="dimmed">
							Showing{" "}
							<span className=" font-semibold">
								{activePage} to {perPage}
							</span>{" "}
							of{" "}
							<span className="text-primary font-semibold">
								{admins?.length}
							</span>{" "}
							entries
						</Text>{" "}
					</span>
					<span className="">
						<Pagination
							value={activePage}
							onChange={handlePageChange}
							position="center"
							total={perPage}
							color="green"
							className="text-primary"
							size="sm"
						/>
					</span>
				</div>
			</section>
		</>
	);
}
