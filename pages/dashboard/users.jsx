import UsersComponent from "../../components/Application/Dashboard/Users";
import withAuth from "../../lib/withAuth";
import Dashboard from ".";

const Users = () => {
  return (
    <Dashboard title="Users">
      <UsersComponent />
    </Dashboard>
  );
};

export default withAuth(Users);
