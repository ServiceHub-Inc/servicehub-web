import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  rem,
} from "@mantine/core";
import { MdStar, MdAssistWalker } from "react-icons/md";
import { SiHandshake } from "react-icons/si";
import { GiPlayerPrevious } from "react-icons/gi";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

const userDetails = {
  image:
    "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VydmljZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  avatar:
    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNlcnZpY2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  name: "Frank Thomas",
  job: "Individual Provider",
  stats: [
    {
      value: "4",
      label: "Requested",
      icon: <MdAssistWalker />,
    },
    {
      value: "5",
      label: "Provided",
      icon: <GiPlayerPrevious />,
    },
    {
      value: "10",
      label: "Engaged",
      icon: <SiHandshake />,
    },
  ],
};

const { image, avatar, name, job, stats } = userDetails;

export function ProfileCard() {
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <div className="flex items-center">
        {stat.icon}
        <Text ta="center" fz="sm" c="dimmed" ml={1}>
          {stat.label}
        </Text>
      </div>
    </div>
  ));

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 160,
        }}
      />
      <span className="w-full h-[45%] top-0 left-0 absolute opacity-25 bg-primary"></span>
      <Avatar
        src={avatar}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="xl" fw={500} mt="sm">
        {name}
      </Text>

      <div className="flex justify-center items-center space-x-3">
        <Text ta="center" fz="sm" c="dimmed">
          {job}
        </Text>
        <span className="text-sm font-semibold flex items-center">
          <MdStar className="text-amber-400 text-base " /> 3.5
        </span>
      </div>
      <Group mt="md" fw={500} c="green" position="center" spacing={30}>
        {items}
      </Group>
    </Card>
  );
}
