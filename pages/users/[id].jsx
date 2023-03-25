import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import ProfilePage from "../../components/Application/ProfilePage";
import { useRouter } from "next/router";
const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="mt-20 pt-10">
      <Container size="lg" px="xs">
        <div className="flex items-center justify-center">
          <Title order={3} className="text-gray-500 text-center mb-2">
            Profile
          </Title>
          {/* Dark mode Switch */}
          <p className="flex justify-end mr-10"></p>
        </div>
        <ProfilePage />
        {id}
      </Container>
    </div>
  );
};

export default Profile;
