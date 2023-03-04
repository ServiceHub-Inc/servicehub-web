import React, { useState } from 'react';
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Loader,
} from '@mantine/core';

const AddUserForm = ({onSubmit}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Setting UserData State
  const [userData, setUserData] = useState({
    name: '', 
    email: '',
    phone: '',
    address: '',
    city: '',
    role: '',
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
    console.log(userData);

    // Reset the form and loading state
    setUserData({ 
      firstName: '', 
      lastName:'',
      email: '',
      phone: '',
      address: '',
      city: '',
      role: '',
    });
    setIsLoading(false);
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
        <Select
          label="Role"
          placeholder="Select role"
          required
          data={[
            { value: 'admin', label: 'Admin' },
            { value: 'client', label: 'Client' },
            { value: 'provider', label: 'Provider' },
            { value: 'staff', label: 'Staff' },
          ]}
          value={userData.role}
          onChange={(value) => setUserData({ ...userData, role: value })}
          name="role"
        />
        <Button type="submit" variant="outline" color="green" fullWidth>
          {isLoading ? <Loader size={24} /> : 'Add User'}
        </Button>
      </Group>
    </form>
  );
};

export default AddUserForm;
