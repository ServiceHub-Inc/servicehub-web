import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Paper,
  Divider,
} from "@mantine/core";

import { useRouter } from "next/router";
import { ProfileCard } from "../../../components/utils/ProfileCard";
import Pages from "../index";
const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Pages title="Profile">
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Paper
            shadow="md"
            p="md"
            radius="md"
            className="hover:shadow-xl bg-gray-100"
          >
            <ProfileCard />
          </Paper>
          <Paper shadow="md" p="xl" className="col-span-2">
            <div>
              <Divider color="green" label="Frank's Personal Information" />
            </div>
          </Paper>
        </div>
      </section>
    </Pages>
  );
};

export default Profile;
