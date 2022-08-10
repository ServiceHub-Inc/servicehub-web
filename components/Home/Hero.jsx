import {
  createStyles,
  Image,
  Title,
  Button,
  Group,
  Text,
  List,
} from "@mantine/core";
import { MdCheckCircle } from "react-icons/md";
import image from "../../public/images/hero-image.svg";

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

export default function HeroComponent() {
  const { classes } = useStyles();
  return (
    <div>
      <div className="lg:w-[90%] mx-auto lg:grid grid-cols-5 mt-28">
        <div className="col-span-3">
          <Title className={classes.title}>
            A{" "}
            <span className="bg-primary bg-opacity-10 px-1 py-3 rounded-sm relative">
              Convenient
            </span>{" "}
            and
            <br />{" "}
            <span className="bg-primary bg-opacity-10 px-1 py-3 rounded-sm relative">
              Safer
            </span>{" "}
            way to access services
          </Title>
          <Text color="dimmed" mt="md">
            Access all the various services you need on a simple and unified
            platform you can trust,
            <br />
            from the best and thoroughly verified professionals near you.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <MdCheckCircle className="text-primary" size={15} stroke={1.5} />
            }
          >
            <List.Item>
              <b>Unified Access</b> – Access all the various services you need
              on one platform
            </List.Item>
            <List.Item>
              <b>Professional Providers</b> – Access the best and thoroughly
              verified professionals
            </List.Item>
            <List.Item>
              <b>Secure Payment</b> – pay for rendered services in an easy and
              also secured way.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className="bg-primary text-white">
              Provide Services
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className="border border-primary"
            >
              Request Services
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={`${classes.image} col-span-2`} />
      </div>
    </div>
  );
}
