import {useState} from 'react';
import moment from 'moment';
import {Avatar,TextInput,Pagination,ActionIcon, useMantineColorScheme,Td, Tr,
  createStyles,Table, Image,Title, Button,Container,Group,Text,List,Breadcrumbs, Anchor} from "@mantine/core";
import { usePagination } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconUserPlus,IconSun, IconMoonStars, IconEye, IconDotsVertical, IconTrash, IconUserCheck,IconCircleCheck } from '@tabler/icons';
import UserModal from "../utils/Modal";
import AddUserForm from '../Forms/AddUserForm';
import { faker } from '@faker-js/faker';
import UserTable from '../Forms/UserTable';




//Creating a Dummy Data with Faker 
export const USERS = [];
export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    registeredAt: faker.date.past(),
    idType: faker.helpers.arrayElement(['Ghana-Card', 'VotersID', 'NHIS-Card']),
    userRole: faker.helpers.arrayElement(['Client', 'Provider', 'Staff'])
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
  { title: 'Dashboard', href: '#' },
  { title: 'Users', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

    

export default function UsersComponent() {
  const users=USERS
  ///Search functionality
  const [searchQuery, setSearchQuery] = useState('');

  //Setting UserList states
  const [usersList, setUsersList]= useState([]);

  //Adding add user function
  const handleAddUser = (newUser) => {
    setUsersList([newUser, ...usersList]);
  };


  const { classes } = useStyles();
  
  
  //------------------------------ADD USER MODAL---------------------------//
  const openAddUserModal = () => {
    const id= modals.open({
      title:"Add New User",
      size:"xl",
      children: (
        <>
          <AddUserForm addUser={handleAddUser} close={modals.closeAll}/>
        </>
      ),
    });
  };

  //-----------------------------ADD USER MODAL ENDS HERE--------------------------------//

//For DAtA test Purposes--------------Merging Generated Users and Added USers//
 const mergedUsers=[...usersList, ...USERS];


  
          //---------------------- PAGINATION BLOCK-----------------------//
  //Pagination
  const [activePage, setPage] = useState(1);
  const limit = 5;
  const perPage = Math.ceil(mergedUsers.length/limit);

  const startIndex = (activePage - 1) * limit;
  const endIndex = startIndex + limit;
  const activePageData = mergedUsers.slice(startIndex, endIndex)// Splicing Data PerPage

  //Handling Page Change
  const handlePageChange =(newPage)=>{
        setPage(newPage);
  }

//---------------------- PAGINATION BLOCK ENDS HERE-----------------------//


  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <div className="mt-16">  
      <Container size="lg" px="xs" >
        
        <div className="flex items-center justify-between">
        <Breadcrumbs>{items}</Breadcrumbs>
            {/* Custom Separator */}
            {/* <Breadcrumbs separator="→">{items}</Breadcrumbs> */}
             <Title className="text-gray-500 text-center mb-2">Users</Title>

             {/* Dark mode Switch */}
            <p className="flex justify-end mr-10">
              <ActionIcon
                  variant="outline"
                  color={dark ? 'yellow' : 'green'}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
                </ActionIcon> 
            </p>
        </div>
          
          
         

            <UserTable users={USERS}/>

                <div className="px-4">
                    <Button 
                      leftIcon={<IconUserPlus size={16}/>} 
                      variant="outline" color="green" 
                      onClick={openAddUserModal}
                      className='text-sm'
                      >ADD</Button>
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
              
              {activePageData.map((user) => (
                <tr key={user.userId}>
                  <td>
                    <Avatar src={user.avatar} alt={user.username} radius="xl" size={32} />
                  </td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.userRole}</td>
                      <td>{user.idType}</td>
                      <td>{user.email} </td>
                      
                      <td>{moment(user.registeredAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
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
                ))//Map
                }
       </tbody>
        </Table>
        <div className="py-2 my-1">
           <Pagination 
            value={activePage} 
            onChange={handlePageChange}
            position='center'
            total={perPage} 
            color="green" 
            className='text-primary' 
            size="sm"/>
        </div>
      </Container>
    </div>
  );
}
