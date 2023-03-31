import withAuth from "../../lib/withAuth";
import { useRouter } from "next/router";

import { Button } from "@mantine/core";
import notify from "../../lib/notify";

const Pages = () => {
  return (
    <div className="mx-auto p-8 w-full">
      <main></main>
      <h1>Dashboard HEre</h1>
      <h1>Dashboard HEre</h1>
      <h1>Dashboard HEre</h1>
      <Button
        onClick={() => notify.success({ message: "", title: "Login Success" })}
      >
        click
      </Button>
    </div>
  );
};

export default withAuth(Pages);
