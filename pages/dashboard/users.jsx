import Pages from ".";
import UsersComponent from "../../components/Application/Dashboard/Users";
import withAuth from "../../lib/withAuth";

const Users = () => {
  return (
    <Pages title="Users">
      <UsersComponent />
    </Pages>
  );
};

export default withAuth(Users);
