import { useState, useEffect } from "react";
import moment from "moment";
import {
  Avatar,
  Indicator,
  Divider,
  Paper,
  TextInput,
  Pagination,
  ActionIcon,
  useMantineColorScheme,
  Menu,
  createStyles,
  Table,
  Image,
  Title,
  Button,
  Container,
  Group,
  Text,
  List,
  Anchor,
} from "@mantine/core";
import { modals, openModal } from "@mantine/modals";
import {
  IconUserPlus,
  IconSun,
  IconMoonStars,
  IconArrowsLeftRight,
  IconEye,
  IconDotsVertical,
  IconTrash,
  IconCircleCheck,
  IconEdit,
} from "@tabler/icons";
import UserModal from "../utils/Modal";
import AddUserForm from "../Forms/AddUserForm";
import { faker } from "@faker-js/faker";
import UserTable from "../Forms/UserTable";
import Breadcrumb from "../utils/BreadCrumbs";

//Creating a Dummy Data with Faker
export const USERS = [];
export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number("(###) ###-####"),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    avatar: faker.image.avatar(),
    registeredAt: faker.date.past(),
    idType: faker.helpers.arrayElement(["Ghana-Card", "VotersID", "NHIS-Card"]),
    userRole: faker.helpers.arrayElement(["Client", "Provider", "Staff"]),
  };
}
Array.from({ length: 3 }).forEach(() => {
  USERS.push(createRandomUser());
});

//Checking if user is approved
//const approved=1;

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

const items = [
  { title: "Dashboard", href: "#" },
  { title: "Users", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function UsersComponent() {
  const users = USERS;

  //Delete User Confirmation.
  const DeleteModal = (user) =>
    modals.openConfirmModal({
      classNames: {
        header: "text-center",
        title:
          "w-full font-bold text-center w-full rounded-md text-red-500 font-bold",
        body: "text-center border-solid border-gray-200 rounded-md p-4",
        close: "text-white text-4xl hover:text-red-800",
        confirm: "text-center flex justify-content-center", // add justify-content-center here
      },
      title: `Delete User`,
      size: "sm",
      centered: true,
      children: (
        <Text fz="md" ta="center" className="pb-4">
          Are you sure you want to delete {`${user.firstName}`}?
        </Text>
      ),
      labels: { confirm: "Yes, Delete", cancel: "No, Cancel" },
      // labels: {
      //   confirm: <Text>Delete</Text>,
      //   cancel: "Cancel",
      // },
      confirmProps: { color: "red", position: "left" },
      onCancel: () => console.log(user.firstName),
      onConfirm: () => deleteUser(user.userId),
    });

  const [selectedUser, setSelectedUser] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (userId) => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setIsOpen(false);
  };

  ///Search functionality
  const [searchQuery, setSearchQuery] = useState("");

  //Setting UserList states
  const [usersList, setUsersList] = useState(USERS);

  //Getting users List from LocalStorage
  useEffect(() => {
    const storedUsersList = localStorage.getItem("usersList");
    if (storedUsersList) {
      setUsersList(JSON.parse(storedUsersList));
    }
  }, []);

  //Adding user function
  const handleAddUser = (newUser) => {
    setUsersList([newUser, ...usersList]);
    //Setting users to LocalStorage
    localStorage.setItem("usersList", JSON.stringify([newUser, ...usersList]));
  };

  //"Updating User function"
  const updateUser = (user) => {
    setUsersList([user, ...usersList]);
  };

  // Function to remove/Delete a user from the list
  const deleteUser = (userId) => {
    setUsersList(usersList.filter((user) => user.userId !== userId));

    // Remove user from local storage
    const userData = localStorage.getItem("usersList");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const updatedUserData = parsedUserData.filter(
        (user) => user.userId !== userId,
      );
      localStorage.setItem("usersList", JSON.stringify(updatedUserData));
    }
  };

  const { classes } = useStyles();

  //------------------------------ADD USER MODAL---------------------------//
  const openAddUserModal = () => {
    const id = modals.open({
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
          Add New User
        </Text>
      ),

      size: "65%",
      children: (
        <>
          <AddUserForm addUser={handleAddUser} close={modals.closeAll} />
        </>
      ),
    });
  };

  //-----------------------------ADD USER MODAL ENDS HERE--------------------------------//

  //For DAtA test Purposes--------------Merging Generated Users and Added USers//

  //---------------------- PAGINATION BLOCK-----------------------//
  //Pagination
  const [activePage, setPage] = useState(1);
  const limit = 5;
  const perPage = Math.ceil(usersList.length / limit);

  const startIndex = (activePage - 1) * limit;
  const endIndex = startIndex + limit;
  const activePageData = usersList.slice(startIndex, endIndex); // Splicing Data PerPage

  //Handling Page Change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //---------------------- PAGINATION BLOCK ENDS HERE-----------------------//

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <div className="mt-16">
      <Container size="lg" px="xs">
        <div className="flex items-center justify-between">
          <Breadcrumb items={items} />
          <Title order={3} className="text-gray-500 text-center mb-2">
            Users
          </Title>
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
        </div>
        <div className=" items-center px-10 max-w-md mx-auto">
          <UserTable />
        </div>

        <div className="px-4">
          <Button
            leftIcon={<IconUserPlus size={16} />}
            variant="outline"
            color="green"
            onClick={openAddUserModal}
            className="text-sm"
          >
            ADD
          </Button>
        </div>

        {/* SEarch Field */}
        {/* <div className="py-2 my-2">
                          <TextInput
                              placeholder="Search..."
                              value={searchQuery}
                              onChange={(event) => setSearchQuery(event.target.value)}
                          />
                </div> */}

        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Type</th>
              <th>ID Type/Number</th>
              <th>email</th>
              <th>Reg Date</th>
              <th>Verified</th>
              <th>User Details</th>
            </tr>
          </thead>
          <tbody>
            {
              activePageData.map((user) => (
                <tr key={user.userId}>
                  <td>
                    <Group spacing="sm">
                      <Avatar
                        size={32}
                        src={user.avatar}
                        radius="xl"
                        onClick={() => setSelectedUser(user)}
                        className="hover:shadow-md transition duration-150 ease-in-out cursor-pointer"
                      />
                      <div>
                        <Text fz="sm" fw={500}>
                          {user.firstName}
                        </Text>
                        <Text
                          fz="xs"
                          c="dimmed"
                          className="text-gray-500 opacity-30"
                        >
                          {user.email}
                        </Text>
                      </div>
                    </Group>
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userRole}</td>
                  <td>{user.idType}</td>
                  <td>{user.email} </td>

                  <td>{moment(user.registeredAt).format("MMMM Do YYYY")}</td>
                  <td>
                    <span className="text-primary">
                      <IconCircleCheck />
                    </span>
                    <UserModal title="User Details">hello</UserModal>
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
                            onClick={() => setSelectedUser(user)}
                            icon={<IconEye size={14} />}
                          >
                            View
                          </Menu.Item>
                          <Menu.Item icon={<IconEdit size={14} />}>
                            Edit
                          </Menu.Item>
                          <Menu.Divider />

                          <Menu.Label>Danger zone - Careful</Menu.Label>
                          <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                            Transfer Data
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => DeleteModal(user)}
                            color="red"
                            icon={<IconTrash size={14} />}
                          >
                            Delete Account
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                    {/* <span>
                          <UserModal title="User Details">body</UserModal>
                        </span> */}

                    {/* <span className="px-1 mx-1"><IconTrash/></span>
                      <span>
                        {approved ? <IconUserCheck/> : "Not Approved" }
                      </span> */}
                  </td>
                </tr>
              )) //Map
            }
          </tbody>
        </Table>

        <div>
          {selectedUser && (
            <UserModal
              title={`${selectedUser.firstName}'s Details`}
              isOpen={true}
              handleClose={handleClose}
            >
              <div className="px-8 py-6">
                <div className="flex items-center justify-center mb-6">
                  <Indicator
                    inline
                    size={16}
                    offset={7}
                    label={selectedUser.userRole}
                    position="bottom-end"
                    color="green"
                    withBorder
                  >
                    <Avatar
                      src={selectedUser.avatar}
                      alt={selectedUser.firstName}
                      radius="xl"
                      className="shadow-md hover:shadow-lg"
                      size={68}
                    />
                  </Indicator>
                  <div className="ml-6">
                    <h2 className="text-3xl font-bold text-primary">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 ">
                  <div>
                    <p className="text-xl font-medium mb-1 text-gray-500">
                      <Divider
                        label="Contact Information"
                        labelPosition="center"
                        my="sm"
                      />
                    </p>
                    <p className="text-md list-none ml-0">
                      <li className="mb-1 text-gray-600 ">
                        {selectedUser.email}
                      </li>
                      <li className="mb-1 text-gray-600">
                        {selectedUser.phone}
                      </li>
                      <li className="text-gray-600">
                        {selectedUser.address} | {selectedUser.city}
                      </li>
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-medium mb-1 text-gray-500">
                      <Divider
                        label="Other Info"
                        labelPosition="right"
                        my="sm"
                      />
                    </p>
                    <Paper>
                      <p className="text-md list-none ml-0">
                        <li className="mb-1 text-gray-600 ">
                          {selectedUser.idType}
                        </li>
                        <li className="mb-1 text-gray-600">
                          {moment(selectedUser.registeredAt).format(
                            "MMMM Do YYYY",
                          )}
                        </li>
                        <li className="text-gray-600">
                          {selectedUser.userRole}
                        </li>
                      </p>
                    </Paper>
                  </div>
                </div>
              </div>
            </UserModal>
          )}
        </div>
        <div className="py-2 my-1">
          <Pagination
            value={activePage}
            onChange={handlePageChange}
            position="center"
            total={perPage}
            color="green"
            className="text-primary"
            size="sm"
          />
        </div>
      </Container>
    </div>
  );
}
