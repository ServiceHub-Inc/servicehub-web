import  { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  TextInput,Button,Group,Select,Loader, NativeSelect} from '@mantine/core';
import { faker } from '@faker-js/faker';
import {IconUserExclamation} from '@tabler/icons'

const AddUserForm = ({addUser, close}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Setting UserData State
  const [userData, setUserData] = useState({
    avatar:faker.image.avatar(),
    idType: faker.helpers.arrayElement(['Ghana-Card', 'VotersID', 'NHIS-Card']),
    firstName:'',
    lastName:'',
    email: '',
    phone: '',
    address: '',
    city: '',
    userRole: '',
  });

  // Handling FormInput Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userId = uuidv4(); // Generate unique ID
    const user = { userId, ...userData }; // Combine ID with form data
    addUser(user);

    // Resetting the form and loading state
    setUserData({ 
      firstName: '', 
      lastName:'',
      email: '',
      phone: '',
      address: '',
      city: '',
      userRole: '',
    });
    setIsLoading(false);
    close();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group>
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            required
            value={userData.firstName}
            onChange={handleInputChange}
            name="firstName"
          />

          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            required
            value={userData.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
        <TextInput
          label="Email"
          placeholder="Enter email"
          required
          type="email"
          value={userData.email}
          onChange={handleInputChange}
          name="email"
        />
        <TextInput
          label="Phone"
          placeholder="Enter phone number"
          required
          type="tel"
          value={userData.phone}
          onChange={handleInputChange}
          name="phone"
        />
        <TextInput
          label="Address"
          placeholder="Enter address"
          required
          value={userData.address}
          onChange={handleInputChange}
          name="address"
        />
        <TextInput
          label="City"
          placeholder="Enter city"
          required
          value={userData.city}
          onChange={handleInputChange}
          name="city"
        />
         </Group>

         <Group className='pt-2 mt-2'>
        <NativeSelect
          label="User Role"
          clearable
          description="Select user role"
          required
          icon={<IconUserExclamation size="1rem"/>}
          data={[   
                    { value: 'admin', label: 'Admin',  },
                    { value: 'client', label: 'Client' },
                    { value: 'provider', label: 'Provider' },
                    { value: 'staff', label: 'Staff' },
          ]}
          value={userData.userRole}
          // onChange={(value) => console.log(value)}
          onChange={handleInputChange}
          name="userRole"
        />
        <Button type="submit" variant="outline" color="green" fullWidth>
          {isLoading ? <Loader size={24} /> : 'Add User'}
        </Button>
        </Group>
    </form>
  );
};

export default AddUserForm;
