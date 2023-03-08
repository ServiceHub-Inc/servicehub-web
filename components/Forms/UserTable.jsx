import { useState } from "react";
import { TextInput } from "@mantine/core";
import { Table } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const UserTable = ({ users }) => {
  const [searchValue, setSearchValue] = useState("");

  const filter = () => handlers.filter((item) => item.a === "new-prop");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="mx-4 px-4 my-3">
      <TextInput
        label="Search"
        placeholder="Search users..."
        icon={<IconSearch size="1rem" />}
        value={searchValue}
        onChange={handleSearchChange}
      />
      <Table>
        {/* <Tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
            </tr>
          ))}
        </Tbody> */}
      </Table>
    </div>
  );
};

export default UserTable;
