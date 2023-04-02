import Pages from ".";
import withAuth from "../../lib/withAuth";

const Home = () => {
  return (
    <Pages title="Home">
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
    </Pages>
  );
};

export default withAuth(Home);
