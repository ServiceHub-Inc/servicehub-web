import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";

export default function UserTable({ props, searchQuery, setSearchQuery }) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="sm"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      placeholder="Search Users..."
      rightSectionWidth={38}
      {...props}
    />
  );
}
