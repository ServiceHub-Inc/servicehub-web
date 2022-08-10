import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  TablerIcon,
  IconMapPins,
  IconCoin,
  IconListCheck,
} from "@tabler/icons";

export const MOCKDATA = [
  {
    icon: IconMapPins,
    title: "Proximity is key",
    description:
      "We connect you to people around you who need your services or can provide the service you need. No distance barrier.",
  },
  {
    icon: IconUser,
    title: "Privacy focused",
    description:
      "You decide the terms of your dealings. No need to worry about privacy issues, even during the rendering of services.",
  },
  {
    icon: IconCookie,
    title: "Best Quality Professionals",
    description:
      "Service providers on ServiceHub are well vetted and thorougly verified professionals. No wahala. ",
  },
  {
    icon: IconCoin,
    title: "Affordable Pricing",
    description:
      "Platform charges for Service Providers are very affordable and flexible. We are here for you.",
  },
  {
    icon: IconMessage2,
    title: "24/7 Support",
    description:
      "We provide rapid and thorough support to both Service Providers and Customers, at all times.",
  },
  {
    icon: IconListCheck,
    title: "Easy Onboarding",
    description:
      "In just a few minutes you can get yourself a client or a service provider, and get business going",
  },
];

export const TITLE = "Make your craft known, get your needs met";
export const DESCRIPTION =
  "Whether you want to advertise your craft, or get a service to be rendered, we're here for you. ServiceHub gives you a platform to carry out your business.";

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon
        variant="light"
        size={40}
        radius={40}
        className="bg-primary bg-opacity-10"
      >
        <Icon size={20} stroke={1.5} color="#32CD32" />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

export default function Features({
  title = TITLE,
  description = DESCRIPTION,
  data = MOCKDATA,
}) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <div className="lg:w-[90%] mx-auto py-16 lg:mt-10">
      <Title className={classes.title}>{title}</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "xl" },
          { maxWidth: 755, cols: 1, spacing: "xl" },
        ]}
      >
        {features}
      </SimpleGrid>
    </div>
  );
}
