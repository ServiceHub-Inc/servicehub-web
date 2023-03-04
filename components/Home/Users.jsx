import {useState} from 'react';
import {Avatar,TextInput,Pagination,ActionIcon, useMantineColorScheme,
  createStyles,Table,Image,Title, Button,Container,Group,Text,List,Breadcrumbs, Anchor} from "@mantine/core";
import { usePagination } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconUserPlus,IconSun, IconMoonStars, IconEye, IconDotsVertical, IconTrash, IconUserCheck,IconCircleCheck } from '@tabler/icons';
import UserModal from "../utils/Modal";
import AddUserForm from '../Forms/AddUserForm';
import { faker } from '@faker-js/faker';


//Creating a Dummy Data with Faker 
export const USERS = [];
export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    registeredAt: faker.date.past(),
    idType: faker.helpers.arrayElement(['Ghana-Card', 'VotersID', 'NHIS-Card']),
    userType: faker.helpers.arrayElement(['Client', 'Provider', 'Staff'])
  };
}
Array.from({ length: 10 }).forEach(() => {
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
  { title: 'Dashboard', href: '#' },
  { title: 'Users', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));


export default function UsersComponent() {

  
  const { classes } = useStyles();
       
  
  const openAddUserModal = () => {
    const id= modals.open({
      title:"Add New User",
      size:"xl",
      children: (
        <>
          <AddUserForm/>
        </>
      ),
    });
  };
  
  //Pagination
  const pagination = usePagination({ total: 10, initialPage: 1 });
  pagination.range;

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <div className="mt-20">  
      <Container size="lg" px="xs" >
        {/* Dark mode Switch */}
        <div className="flex justify-end mr-10">
          <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'green'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
            </ActionIcon> 
        </div>
        <Breadcrumbs>{items}</Breadcrumbs>
      
      {/* Custom Separator */}
      {/* <Breadcrumbs separator="→">{items}</Breadcrumbs> */}
         <Title className="text-gray-500 text-center mb-3">Users</Title>
        
                <div className="px-4">
                    <Button 
                      leftIcon={<IconUserPlus size={16}/>} 
                      variant="outline" color="green" 
                      onClick={openAddUserModal}
                      >ADD</Button>
         </div>
  
         <Table highlightOnHover>
              <thead>
              <tr>
                <th>Image</th>
                <th>Username</th>
                <th>User Type</th>
                <th>ID Type/Number</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Reg Date</th>
                <th>Verified</th>
                <th>User Details</th>
              </tr>
            </thead>
            <tbody>{USERS.map((user) => (
    <tr key={user.userId}>
      <td>
        <Avatar src={user.avatar} alt={user.username} radius="xl" size={32} />
      </td>
      <td>{user.username}</td>
      <td>{user.userType}</td>
      <td>{user.idType}</td>
      <td>{user.firstName} </td>
      <td>{user.lastName}</td>
      <td>"Date here"</td>
      <td>
          <span className="text-primary">
            <IconCircleCheck />
          </span>
          
      </td>
      <td> 
       
            <span>
              <UserModal title="User Details">body</UserModal>
            </span>
          
          {/* <span className="px-1 mx-1"><IconTrash/></span>
          <span>
            {approved ? <IconUserCheck/> : "Not Approved" }
          </span> */}
      </td>
    </tr>
  ))
  }
  </tbody>
        </Table>
        <Pagination total={5} color="green" className='text-primary' />
        <Button color="ocean-blue">Ocean blue button</Button>
      </Container>
    </div>
  );
}
