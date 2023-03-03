import {useState} from 'react';
import { useModal } from '@mantine/core';
import {Avatar,TextInput,
  createStyles,Table,Image,Title, Button,Container,Group,Text,List,Breadcrumbs, Anchor} from "@mantine/core";
  import { useModals } from '@mantine/modals';
  import { IconUserPlus, IconEye, IconDotsVertical, IconTrash, IconUserCheck,IconCircleCheck } from '@tabler/icons';
import UserModal from "../utils/Modal";


  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Fred' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Michael' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Frank' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Kobby' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Jerry' },
  ];

    //Checking if user is approved
      const approved=1;

  


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

  const modals = useModals();
  const { classes } = useStyles();
       
  const addUserModal = () => {
    const id = modals.openModal({
      title: 'Add New User',
      children: (
        <>
          <TextInput label="name" placeholder="firstname" data-autofocus />

          {/* <Button fullWidth onClick={() => modals.closeModal(id)} mt="md">
            Submit
          </Button> */}
        </>
      ),
    });
  };
  

  return (
    <div className="mt-20">  
      <Container size="lg" px="xs" >
        <Breadcrumbs>{items}</Breadcrumbs>
      
      {/* Custom Separator */}
      {/* <Breadcrumbs separator="→">{items}</Breadcrumbs> */}
         <Title className="text-gray-500 text-center mb-3">Users</Title>

         <div className="px-4">
            {/* <p><Button variant="outline" color="green">add</Button></p> */}
              
            <Button leftIcon={<IconUserPlus size={16}/>} onClick={addUserModal} variant="outline" color="green" >ADD</Button>
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
            <tbody>{elements.map((element) => (
    <tr key={element.name}>
      <td>
          <Avatar radius="xl" />
      </td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td>{element.position}</td>
      <td>{element.position}</td>
      <td>{element.position}</td>
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
      </Container>
    </div>
  );
}
