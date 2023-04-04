import withAuth from "../../lib/withAuth";
import Dashboard from ".";
const Home = () => {
  return (
    <>
      <Dashboard title="Home">
        <h1>Dashboard Item Goes here</h1>
      </Dashboard>
    </>
  );
};

export default withAuth(Home);
