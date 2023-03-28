import AppFooter from "../../components/Application/AppFooter";
import AppHeader from "../../components/Application/AppHeader";
import ProfilePage from "../../components/Application/ProfilePage";
const SharedProfile = ({ name, bio, avatarUrl }) => {
  return (
    <>
      <AppHeader />
      <ProfilePage />
      <AppFooter />
    </>
  );
};

export default SharedProfile;
