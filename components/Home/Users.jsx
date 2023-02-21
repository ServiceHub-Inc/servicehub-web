import {Avatar,
  createStyles,Table,Image,Title,Button,Container,Group,Text,List,Breadcrumbs, Anchor} from "@mantine/core";
  import { IconEye, IconDotsVertical, IconTrash, IconUserCheck,IconCircleCheck } from '@tabler/icons';


  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Fred' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Michael' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Frank' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Kobby' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Jerry' },
  ];

    //Checking if user is approved
      const approved=1;

  const rows = elements.map((element) => (
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
          <span><IconDotsVertical/></span>
          {/* <span className="px-1 mx-1"><IconTrash/></span>
          <span>
            {approved ? <IconUserCheck/> : "Not Approved" }
          </span> */}

      </td>
    </tr>
  ));


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
  { title: 'User ID', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function UsersComponent() {
  const { classes } = useStyles();
  return (
    <div className="mt-20">  
      <Container size="lg" px="xs" >
      <Breadcrumbs>{items}</Breadcrumbs>

      {/* Custom Separator */}
      {/* <Breadcrumbs separator="→">{items}</Breadcrumbs> */}
         <Title className="text-gray-500 text-center mb-3">Users</Title>
  
         <Table highlightOnHover withBorder withColumnBorders>
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
            <tbody>{rows}</tbody>
        </Table>
      </Container>
    </div>
  );
}
