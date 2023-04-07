import AdminsComponent from "../../components/Application/Dashboard/Admins";
import withAuth from "../../lib/withAuth";
import Dashboard from ".";

const Admins = () => {
  return (
    <Dashboard title="Admins">
      <AdminsComponent />
    </Dashboard>
  );
};

export default withAuth(Admins);