import {useState} from "react";
import { useListState } from '@mantine/hooks';
import { TextInput } from '@mantine/core';
import { Table, Tbody, Tr, Td } from '@mantine/core';

const UserTable = ({users}) => {
    const [searchValue, setSearchValue] = useState('');
    
    const filter = () => handlers.filter((item) => item.a === 'new-prop');
  
    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };

       
    return ( 
        <div className="mx-4 px-4 my-3">
      <TextInput
        label="Search"
        placeholder="Search users..."
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
}
 
export default UserTable;