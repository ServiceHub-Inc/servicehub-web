import { useState } from 'react';
import { TextInput, Button, Group, NativeSelect, Loader } from '@mantine/core';
import { IconUserExclamation } from '@tabler/icons';

const EditUserForm = ({ user, updateUser, close }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Setting UserData State with the passed user data
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    userRole: user.userRole,
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

    const updatedUser = { ...user, ...userData }; // Merge existing user data with updated form data
    updateUser(updatedUser);

    // Resetting the form and loading state
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

      <Group className="pt-2 mt-2">
        <NativeSelect
          label="User Role"
          clearable
          description="Select user role"
          required
          icon={<IconUserExclamation size="1rem" />}
          data={[
            { value: 'admin', label: 'Admin' },
            { value: 'client', label: 'Client' },
            { value: 'provider', label: 'Provider' },
            { value: 'staff', label: 'Staff' },
          ]}
          value={userData.userRole}
          onChange={handleInputChange}
          name="userRole"
        />
        <Button type="submit" variant="outline" color="blue" fullWidth>
          {isLoading ? <Loader size={24} /> : 'Update User'}
        </Button>
      </Group>
    </form>
  );
};

export default EditUserForm;
