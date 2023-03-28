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
import ProfilePage from "../../components/Application/ProfilePage";
import { useRouter } from "next/router";
import { ProfileCard } from "../../components/utils/ProfileCard";
const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="mt-16 pt-8">
      <Container size="xl" px="xs">
        <div className="flex items-center justify-center">
          <Title order={3} className="text-gray-500 text-center mb-2">
            User's Profile
          </Title>
          {/* Dark mode Switch */}
          <p className="flex justify-end mr-10"></p>
        </div>

        <section>
          <div className="grid grid-cols-3 gap-8">
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
      </Container>
    </div>
  );
};

export default Profile;
